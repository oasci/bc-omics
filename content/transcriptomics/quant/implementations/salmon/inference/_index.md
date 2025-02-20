---
title: Inference
type: docs
weight: 6
---

Inference is the process of estimating the underlying transcript abundances from the observed RNA-seq data using our generative model.
Given the complex nature of fragment generation and the presence of technical biases, robust inference methods are required to accurately disentangle the contributions of each transcript.
In our framework, inference leverages the detailed fragment–transcript agreement and bias corrections to compute the most likely set of transcript abundances that explain the observed data.

To manage the immense scale and complexity of RNA-seq datasets, our inference strategy is divided into two distinct phases: an online phase and an offline phase.

-   The online phase quickly processes data in a streaming fashion, providing rapid, initial estimates of transcript abundances while simultaneously learning auxiliary parameters, including bias corrections.
-   The offline phase then refines these preliminary estimates by iteratively optimizing a reduced representation of the data, ensuring that the final abundance estimates are both precise and robust.

This two-phase approach balances computational efficiency with accuracy, enabling the model to scale to large datasets while effectively capturing the underlying biological signal.

## Online

The online inference phase is designed to rapidly and efficiently estimate transcript abundances from large RNA-seq datasets by processing fragments as they are streamed.
This phase updates both the primary parameters (transcript counts) and auxiliary parameters (bias models and fragment-length distributions) on-the-fly, using a variant of the online Expectation–Maximization (EM) algorithm.

In a traditional batch EM algorithm, all data are reprocessed multiple times to update parameter estimates until convergence is achieved.
However, as sequencing depths grow, this method becomes prohibitively slow and memory intensive.
The online EM algorithm overcomes these limitations by:

- **Processing Fragments Incrementally:** Data are handled one fragment—or small mini-batches of fragments—at a time.
- **Gradual Updating:** Each new fragment contributes to updating transcript counts, with older fragments’ influences gradually diminished by a “forgetting mass.”
- **Concurrent Learning of Auxiliary Parameters:** Parameters that account for biases (e.g., sequence-specific, GC-content) and the fragment-length distribution are updated concurrently, ensuring that all aspects of the generative model are refined as more data arrive.

### Updating transcript counts

> [!caution]
> The notation here needs a lot of work and is not consistent or correct.
> I need to unify the notation between [eXpress](https://doi.org/10.1038/nmeth.2251) and [salmon](https://doi.org/10.1038/nmeth.4197).

Let $\alpha_t^{i}$ be the estimated count for transcript $t$ after processing $i$ fragments.
When a new fragment (or mini-batch) is processed, its contribution a transcript is denoted by $\Delta \alpha_t^{i}$.
The update rule is given by:

$$
\alpha_t^{i+1} = \alpha_t^{i} + m_i \, \Delta \alpha_i^{(i)}
$$

Here:

- $\Delta \alpha_i^{(t)} = \sum_{f_j \in B_t} \Pr\{ f_j \mid t_i \}$ is the aggregate contribution from the current mini-batch $B_t$ of fragments.
- $m_t$ is the forgetting mass at iteration $t$, which controls the weight given to new data relative to the accumulated estimate.

### Forgetting mass

The forgetting factor $\gamma_t$ plays a pivotal role in the online EM algorithm.
Conceptually, it addresses two key issues:

-   **Adaptability:** Early in the analysis, the estimates are based on limited data, so each new fragment should have a large impact
    As more fragments are processed, the estimates become more reliable, and new data should only induce small refinements.
-   **Stability:** The diminishing weight ensures that the algorithm does not overreact to fluctuations in the data.
    Over time, the influence of individual fragments decreases, allowing the estimates to converge to a stable solution.

This approach is analogous to computing a running average where the initial estimates are volatile but gradually stabilize as the sample size increases.

A common choice for the forgetting mass is:

$$
m_{i + 1} = m_i \left( \frac{\gamma_{i + 1}}{1 - \gamma_i} \right) \frac{1}{\gamma_i}
$$

which is dependent on the forgetting factor

$$
\gamma_i = \frac{1}{i^c} \quad \text{with } 0.5 < c \leq 1,
$$

### Normalizing to obtain relative abundances

Once the counts $\alpha_i$ are updated, the relative abundance (or probability) for transcript $t_i$ is computed by normalizing these counts:

$$
\tau_i = \frac{\alpha_i^{(t)}}{\sum_{r \in T} \alpha_r^{(t)}}
$$

This normalization converts the raw counts into a probability distribution over the transcripts, representing the estimated relative abundances.

### Updating auxiliary parameters

In parallel with updating $\alpha_i$, the algorithm also updates parameters that describe:

-   **Fragment Length Distribution:** This is based on the empirical distribution of fragment lengths observed in the data.
-   **Sequence-Specific Bias Models:** Parameters for variable-length Markov models (VLMMs) that capture preferential sequence patterns at fragment ends.
-   **GC Bias Models:** Distributions that account for the influence of fragment GC content on sequencing probabilities.

For example, suppose that $\theta$ represents an auxiliary parameter (such as a bias weight) estimated from the observed fragments.
Its update might be integrated similarly to the transcript counts:

$$
\theta^{(t+1)} = \theta^{(t)} + \gamma_t \, \Delta \theta^{(t)},
$$

where $\Delta \theta^{(t)}$ reflects the contribution of the current mini-batch to the parameter update.
By updating these parameters concurrently, the algorithm refines both the primary and auxiliary components of the model as more data become available.

### Convergence properties

Under mild regularity conditions and with an appropriate choice of the forgetting factor (e.g., $\gamma_t = 1/t^c$ with $0.5 < c \leq 1$), the online EM algorithm converges to a maximum-likelihood solution.
The algorithm is asymptotically equivalent to stochastic gradient ascent in the space of sufficient statistics.
This means that, although the data are processed in a streaming manner, the final abundance estimates will be very similar to those obtained by a full batch EM algorithm, but at a fraction of the computational cost and memory usage.

## Offline

The offline inference phase refines the initial transcript abundance estimates generated during the online phase by operating on a compact representation of the data—specifically, the "rich equivalence classes" of fragments.
While the online phase rapidly processes fragments in a streaming manner to provide a coarse solution, the offline phase uses iterative optimization techniques to fine-tune these estimates, ensuring a more precise and robust quantification of transcript abundances.

After the online phase, we obtain preliminary transcript counts that capture the main structure of the data.
However, processing every individual fragment repeatedly is computationally expensive and unnecessary.
Instead, fragments are grouped into equivalence classes based on their mapping profiles—fragments that map to the same set of transcripts with similar conditional probabilities are aggregated together.
This reduction in data dimensionality allows the offline phase to efficiently re-optimize the abundance estimates by working on these groups rather than the entire dataset.

### Equivalence classes and likelihood factorization

Let $C = \{C_1, C_2, \dots, C_K\}$ denote the set of equivalence classes.
For each equivalence class $C_j$, we define:

-   $d_j = |C_j|$, the total number of fragments in the class.
-   A weight vector $\mathbf{w}_j$ such that $w_{j,t}$ is the average conditional probability $\Pr\{ f \mid t \}$ for fragments in $C_j$ with respect to transcript $t$.

Using these equivalence classes, the overall likelihood function can be factorized as:

$$
L(\pmb{\tau}) \propto \prod_{j=1}^{K} \left( \sum_{t \in T_j} w_{j,t} \, \tau_t \right)^{d_j},
$$

where:

-   $\tau_t$ is the relative abundance for transcript $t$ (with $\sum_{t} \tau_t = 1$),
-   $T_j$ is the set of transcripts to which fragments in $C_j$ map.

This factorization reduces the computational burden, as the likelihood now involves summations over equivalence classes rather than over millions of individual fragments.

### EM algorithm

The offline phase typically employs an iterative EM (Expectation–Maximization) algorithm to maximize the above likelihood function.
The process involves two main steps:

#### Expectation step

For each equivalence class $C_j$ and transcript $t \in T_j$, the algorithm computes the expected contribution of $C_j$ to the count of transcript $t$ using the current abundance estimates.
This is given by:

$$
E_{j,t} = d_j \frac{w_{j,t} \, \tau_t}{\sum_{r \in T_j} w_{j,r} \, \tau_r}.
$$

This term represents the fraction of the $d_j$ fragments in $C_j$ that are expected to originate from transcript $t$.

#### Maximization step

Using the expected contributions from the E-step, the counts for each transcript are updated:

$$
\alpha_t^{(\text{new})} = \sum_{j=1}^{K} E_{j,t}.
$$

The relative abundance estimates are then obtained by normalizing these counts:

$$
\tau_t = \frac{\alpha_t^{(\text{new})}}{\sum_{r \in T} \alpha_r^{(\text{new})}}.
$$

These steps are iterated until convergence—typically defined as the point where the maximum relative change in the estimated counts between iterations falls below a predetermined threshold.
