---
title: Salmon
type: docs
weight: 2
---


> [!warning]
>
> We assume you are familiar with the following material:
>
> -   [Problem statement](../../problem/)

Salmon is a method for quantifying transcript abundance from RNA-seq data while accounting for various biases that affect the accuracy of abundance estimates, notably fragment GC-content bias.
It features a dual-phase parallel inference algorithm and bias models to correct for these biases, significantly improving the sensitivity of differential expression analysis.
The method involves lightweight mapping, an online phase for initial expression level estimation and model parameterization, and an offline phase for refining these estimates.
Salmon's approach is demonstrated to outperform existing methods in terms of accuracy, leveraging models for sequence-specific bias and fragment GC bias, among others.

## Biological Assumptions

Understanding the biological foundations of our generative model is essential for grasping how transcript quantification is achieved. In this section, we explain the basic assumptions about the transcriptome and the process of fragment generation, detailing how these elements combine to form the backbone of the model.

### Transcriptome Representation

#### Transcript Set

Imagine the transcriptome as a library of all the RNA messages produced in a cell. In our model, this library is represented by a set $T = \{t_1, t_2, \dots, t_M\}$, where each $t_i$ is a distinct transcript. Each transcript is a string of nucleotides (A, C, G, and T/U) with a known physical length $\ell_i$. This length tells us how many nucleotides make up each transcript and serves as a fundamental property in understanding how much of each transcript is present.

#### Transcript Copy Numbers

In a living cell, not all transcripts are produced in equal amounts. The number of copies of each transcript $t_i$ is denoted by $c_i$. These copy numbers represent the true biological abundance of each transcript, much like how a popular book might be printed in larger quantities than a niche title in a library. They indicate which transcripts are more prevalent in the cell and are central to determining gene expression levels.

### Fragment Generation

#### Nucleotide Fraction

When the cell's RNA is sequenced, the process involves randomly sampling fragments from the entire pool of RNA molecules. In an ideal, unbiased scenario, the likelihood of picking a fragment from any given transcript $t_i$ should be proportional to the number of its copies ($c_i$) and its length. However, rather than using the raw length $\ell_i$, we use the effective length $\ell^\circ_i$, which reflects the fact that not all positions on a transcript are equally likely to produce a complete fragment. The nucleotide fraction $\eta_i$ is defined as:

$$
\eta_i = \frac{c_i \cdot \ell^\circ_i}{\sum_{j=1}^{M} c_j \cdot \ell^\circ_j}
$$

This fraction represents the proportion of the total nucleotides in the sample that come from transcript $t_i$, thus serving as a key parameter in estimating its abundance.

#### Effective Transcript Length

The concept of effective transcript length accounts for practical limitations in fragment generation. Although a transcript has a defined physical length $\ell_i$, not every nucleotide position is equally likely to yield a fragment that can be sequenced. This is because fragments must have a certain length to be useful, and positions near the ends of a transcript may not allow for a full-length fragment to form. Therefore, the effective length $\ell^\circ_i$ adjusts $\ell_i$ by considering the empirical distribution of fragment lengths observed in the sequencing experiment. This adjustment helps correct for "edge effects" and ensures that the model more accurately reflects the regions of the transcript from which fragments can realistically be generated.

## Generative Model

The generative model underlying Salmon is designed to mirror the biological process that produces RNA fragments during sequencing while also incorporating adjustments for technical biases that arise during library preparation and sequencing. This model forms the foundation for estimating transcript abundances by describing how fragments are generated from the transcriptome and by correcting for distortions due to various biases.

The model has two main objectives:

1.  **Capturing Fragment Generation:**  
    It represents the inherent randomness in how RNA fragments are produced from transcripts. Each fragment is assumed to originate from a particular transcript in proportion to that transcript’s true abundance and its effective length (which accounts for the fact that not all regions of a transcript are equally likely to yield a complete fragment).
2.  **Incorporating Bias Corrections:**  
    The model adjusts for technical biases that can affect which fragments are observed. These include sequence-specific biases (often at the fragment ends), GC-content bias, and biases related to fragment length. By modeling these factors, the method corrects for systematic distortions that might otherwise lead to inaccurate estimates of transcript abundance.

## Fragment–Transcript Agreement

Before we introduce the overall likelihood function, it is essential to understand how the model determines the probability that any given RNA fragment originates from a specific transcript. The fragment–transcript agreement model provides this detailed, probabilistic link by evaluating various features of each fragment, such as its length, its starting position on the transcript, its strand orientation, and the quality of its alignment.

The agreement between fragment $f_j$ and transcript $t_i$ is quantified by a conditional probability, denoted as $\Pr\{ f_j \mid t_i \}$. This probability is modeled as the product of several conditional probabilities, each capturing a distinct aspect of the fragment’s generation process:

$$
\Pr\{ f_j \mid t_i \} \propto \Pr\{ \ell \mid t_i \} \cdot \Pr\{ p \mid t_i, \ell \} \cdot \Pr\{ o \mid t_i \} \cdot \Pr\{ a \mid f_j, t_i, p, o, \ell \}
$$

- **$f_j$** : An individual RNA fragment obtained from the sequencing experiment.
- **$t_i$** : A candidate transcript from the reference transcriptome.
- **$\ell$** : The length of a fragment.
- **$p$** : The starting position of the fragment on transcript $t_i$.
- **$o$** : The orientation of the fragment, which reflects strand-specific protocols.
- **$a$** : The alignment score or probability indicating how well $f_j$ maps to $t_i$.

### Fragment Length Probability $\Pr\{ \ell \mid t_i \}$

This term represents the likelihood of observing a fragment of a given length $\ell$ from transcript $t_i$. It is derived from the empirical fragment length distribution, acknowledging that some fragment lengths are inherently more likely than others.

### Positional Probability $\Pr\{ p \mid t_i, \ell \}$

Not all positions along a transcript are equally likely to yield a complete fragment. This probability quantifies the chance that a fragment starting at position $p$ is generated from transcript $t_i$, taking into account the effective length of the transcript. It corrects for edge effects where the likelihood of generating a full-length fragment decreases near the transcript boundaries.

### Orientation Probability $\Pr\{ o \mid t_i \}$

For strand-specific RNA-seq protocols, the orientation $o$ is critical. This term reflects the probability that a fragment is generated with the correct strand orientation relative to transcript $t_i$.

### Alignment Quality $\Pr\{ a \mid f_j, t_i, p, o, \ell \}$

When alignment data is available, this term evaluates how well fragment $f_j$ aligns to transcript $t_i$ given its position $p$, orientation $o$, and length $\ell$. In cases where a fast mapping method (such as quasi-mapping) is used, this term is typically set to 1. Otherwise, it is computed based on the quality of the match between the fragment and the transcript sequence.

### Integrating Fragment–Transcript Agreement

The individual components discussed above together yield a comprehensive measure of how likely it is that a fragment $f_j$ originates from a transcript $t_i$. This probability is fundamental to the next step of the model—constructing the overall likelihood function. By understanding these detailed contributions, we can better appreciate how the likelihood of the entire set of observed fragments is built up from the fragment–transcript agreement probabilities.

## Likelihood Function

With the fragment–transcript agreement model established, we now define the likelihood function that underpins the inference process.

The likelihood function provides a quantitative measure of the “fit” between the model and the actual RNA-seq data. When the estimated transcript abundances ($\pmb{\eta}$) and the fragment-to-transcript assignments ($\pmb{Z}$) are close to the true underlying values, the likelihood is high. Thus, by iteratively adjusting these parameters to maximize the likelihood, the model gradually converges on a solution that most accurately reflects the true composition of the transcriptome.

The probability of observing a set of sequenced fragments $F = \{f_1, f_2, \dots, f_N\}$ is given by:

$$
\begin{align}
    \Pr \{ F \mid \pmb{\eta}, \pmb{Z}, T \} &= \prod_{j=1}^{N} \Pr \{ f_j \mid \pmb{\eta}, \pmb{Z}, T \} \\
    &= \prod_{j = 1}^{N} \sum_{i = 1}^{M} \Pr \{ t_i \mid \pmb{\eta} \} \cdot \Pr \{ f_j \mid t_i, z_{ij} = 1 \}
\end{align}
$$

Here, the components are defined as follows:

-   **$T$ (Transcript Set):**  
    This is the collection of all transcripts in the reference transcriptome, with each transcript $t_i$ having a known sequence and length.

-   **$\pmb{\eta}$ (Transcript Abundances):**  
    This vector contains the nucleotide fractions for each transcript. Each entry, $\eta_i$, represents the relative contribution of transcript $t_i$ to the overall pool of nucleotides. In an unbiased setting, fragments are sampled in proportion to these fractions.

-   **$\pmb{Z}$ (Fragment Assignments):**  
    This is a binary matrix where $z_{ij} = 1$ if fragment $f_j$ is derived from transcript $t_i$, and 0 otherwise. The matrix $\pmb{Z}$ encapsulates the mapping of fragments to their potential transcript origins.

Each $\Pr\{ f_j \mid t_i \}$ term, shorthand for $\Pr \{ f_j \mid t_i, z_{ij} = 1 \}$, is calculated by summing over the potential contributions of each transcript, weighted by the fragment–transcript agreement probabilities described above. Maximizing this likelihood through computational methods allows us to infer the transcript abundances that best explain the observed RNA-seq data.

## Bias Corrections

Accurate transcript quantification is not solely about modeling how fragments are generated—it also requires correcting for technical biases that distort the observed data. These biases arise during library preparation and sequencing, and if left uncorrected, they can lead to systematic errors. For example, certain nucleotide sequences may be preferentially amplified or selected, and fragments with extreme GC content might be under- or overrepresented. Incorporating bias corrections ensures that the estimated transcript abundances accurately reflect the underlying biology.

Biases come into play at various stages of fragment generation. As each fragment is generated, its probability of being observed is influenced by factors such as the sequence context at its ends, its GC content, its strand orientation, and even its position along the transcript. Mathematically, if the uncorrected probability of observing a fragment is denoted as $\Pr\{ f_j \mid t_i \}$, then bias corrections modify this probability by re-weighting it with correction factors derived from bias models. For example, one might express a bias-adjusted probability as:

$$
\Pr\{ f_j \mid t_i \}^{\text{(adj)}} = \Pr\{ f_j \mid t_i \} \times B_{\text{seq}} \times B_{\text{GC}} \times B_{\text{strand}} \times B_{\text{length}}
$$

where each $B$ term represents a bias correction factor for sequence-specific effects, GC content, strand-specific protocol, and fragment length distribution, respectively.

### Sequence-Specific Biases

Sequence-specific biases arise from the inherent preferences of the sequencing process. The nucleotide sequences at the 5′ and 3′ ends of fragments often undergo preferential amplification or selection. These localized sequence effects can distort the observed fragment counts.

Salmon employs variable-length Markov models (VLMMs) to model these biases. The process involves:

- **Foreground Models:** Built from the observed sequences at the fragment ends.
- **Background Models:** Derived from uniformly sampled sequences across the transcriptome, representing an unbiased baseline.

The bias correction factor for sequence-specific effects is computed as the ratio of the foreground model score to the background model score:

$$
B_{\text{seq}} = \frac{\Pr\{ \text{observed sequence} \mid \text{foreground model} \}}{\Pr\{ \text{observed sequence} \mid \text{background model} \}}
$$

This ratio adjusts the probability of fragment selection, compensating for any preferential treatment of specific sequences.

### Fragment GC Bias

GC bias occurs because fragments with very high or very low GC content can be sequenced at rates different from fragments with moderate GC content. Such biases often result from differential amplification efficiency during PCR and the inherent properties of the sequencing technology.

To correct for this, Salmon discretizes the range of GC content into bins—commonly 25 bins that cover values from 0 to 1 in increments of 0.04. Two models are constructed:

- **Foreground GC Model:** Captures the distribution of GC content among the observed fragments.
- **Background GC Model:** Represents the expected GC content distribution based on the transcriptome.

The GC bias correction factor is given by:

$$
B_{\text{GC}} = \frac{\Pr\{ \text{GC content} \mid \text{foreground} \}}{\Pr\{ \text{GC content} \mid \text{background} \}}
$$

This factor re-weights the fragment probability, ensuring that fragments with extreme GC content do not disproportionately influence the quantification.

### Strand-Specific Protocol

Some RNA-seq protocols retain strand information, meaning that the directionality of reads is preserved. In such cases, fragments that map to the unexpected strand can be misinterpreted if strand bias is not corrected.

To account for strand-specific effects, the model adjusts the likelihoods based on whether the fragment aligns to the expected strand. This is done by incorporating a strand-specific correction factor, $B_{\text{strand}}$, which boosts the probability for fragments that align with the expected orientation and down-weights those that do not.

### Fragment Length Distribution

Not every region along a transcript has an equal chance of yielding a sequenced fragment. The physical limitations of fragment generation—especially near the transcript ends—affect the effective transcript length. Consequently, fragments from certain positions are less likely to be sampled.


The effective transcript length, $\ell^\circ_i$, is calculated using the empirical fragment length distribution. This distribution helps determine the probability of observing a fragment of a given length from various positions on a transcript. The bias correction factor $B_{\text{length}}$ accounts for these effects, adjusting the probability of fragment generation based on the empirical distribution of fragment lengths.

## Inference

Inference is the process of estimating the underlying transcript abundances from the observed RNA-seq data using our generative model.
Given the complex nature of fragment generation and the presence of technical biases, robust inference methods are required to accurately disentangle the contributions of each transcript. In our framework, inference leverages the detailed fragment–transcript agreement and bias corrections to compute the most likely set of transcript abundances that explain the observed data.

To manage the immense scale and complexity of RNA-seq datasets, our inference strategy is divided into two distinct phases: an online phase and an offline phase.

-   The online phase quickly processes data in a streaming fashion, providing rapid, initial estimates of transcript abundances while simultaneously learning auxiliary parameters, including bias corrections.
-   The offline phase then refines these preliminary estimates by iteratively optimizing a reduced representation of the data, ensuring that the final abundance estimates are both precise and robust.

This two-phase approach balances computational efficiency with accuracy, enabling the model to scale to large datasets while effectively capturing the underlying biological signal.

### Online

The online inference phase is designed to rapidly and efficiently estimate transcript abundances from large RNA-seq datasets by processing fragments as they are streamed.
This phase updates both the primary parameters (transcript counts) and auxiliary parameters (bias models and fragment-length distributions) on-the-fly, using a variant of the online Expectation–Maximization (EM) algorithm.

In a traditional batch EM algorithm, all data are reprocessed multiple times to update parameter estimates until convergence is achieved. However, as sequencing depths grow, this method becomes prohibitively slow and memory intensive. The online EM algorithm overcomes these limitations by:

- **Processing Fragments Incrementally:** Data are handled one fragment—or small mini-batches of fragments—at a time.
- **Gradual Updating:** Each new fragment contributes to updating transcript counts, with older fragments’ influences gradually diminished by a “forgetting mass.”
- **Concurrent Learning of Auxiliary Parameters:** Parameters that account for biases (e.g., sequence-specific, GC-content) and the fragment-length distribution are updated concurrently, ensuring that all aspects of the generative model are refined as more data arrive.

#### Updating transcript counts

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

#### Forgetting mass

The forgetting factor $\gamma_t$ plays a pivotal role in the online EM algorithm.
Conceptually, it addresses two key issues:

- **Adaptability:** Early in the analysis, the estimates are based on limited data, so each new fragment should have a large impact. As more fragments are processed, the estimates become more reliable, and new data should only induce small refinements.
- **Stability:** The diminishing weight ensures that the algorithm does not overreact to fluctuations in the data. Over time, the influence of individual fragments decreases, allowing the estimates to converge to a stable solution.

This approach is analogous to computing a running average where the initial estimates are volatile but gradually stabilize as the sample size increases.

A common choice for the forgetting mass is:

$$
m_{i + 1} = m_i \left( \frac{\gamma_{i + 1}}{1 - \gamma_i} \right) \frac{1}{\gamma_i}
$$

which is dependent on the forgetting factor

$$
\gamma_i = \frac{1}{i^c} \quad \text{with } 0.5 < c \leq 1,
$$

#### Normalizing to Obtain Relative Abundances

Once the counts $\alpha_i$ are updated, the relative abundance (or probability) for transcript $t_i$ is computed by normalizing these counts:

$$
\tau_i = \frac{\alpha_i^{(t)}}{\sum_{r \in T} \alpha_r^{(t)}}
$$

This normalization converts the raw counts into a probability distribution over the transcripts, representing the estimated relative abundances.

#### Updating Auxiliary Parameters

In parallel with updating $\alpha_i$, the algorithm also updates parameters that describe:

-   **Fragment Length Distribution:** This is based on the empirical distribution of fragment lengths observed in the data.
-   **Sequence-Specific Bias Models:** Parameters for variable-length Markov models (VLMMs) that capture preferential sequence patterns at fragment ends.
-   **GC Bias Models:** Distributions that account for the influence of fragment GC content on sequencing probabilities.

For example, suppose that $\theta$ represents an auxiliary parameter (such as a bias weight) estimated from the observed fragments.
Its update might be integrated similarly to the transcript counts:

$$
\theta^{(t+1)} = \theta^{(t)} + \gamma_t \, \Delta \theta^{(t)},
$$

where $\Delta \theta^{(t)}$ reflects the contribution of the current mini-batch to the parameter update. By updating these parameters concurrently, the algorithm refines both the primary and auxiliary components of the model as more data become available.

### Convergence Properties

Under mild regularity conditions and with an appropriate choice of the forgetting factor (e.g., $\gamma_t = 1/t^c$ with $0.5 < c \leq 1$), the online EM algorithm converges to a maximum-likelihood solution. The algorithm is asymptotically equivalent to stochastic gradient ascent in the space of sufficient statistics. This means that, although the data are processed in a streaming manner, the final abundance estimates will be very similar to those obtained by a full batch EM algorithm, but at a fraction of the computational cost and memory usage.

### Offline

The offline inference phase refines the initial transcript abundance estimates generated during the online phase by operating on a compact representation of the data—specifically, the "rich equivalence classes" of fragments.
While the online phase rapidly processes fragments in a streaming manner to provide a coarse solution, the offline phase uses iterative optimization techniques to fine-tune these estimates, ensuring a more precise and robust quantification of transcript abundances.

After the online phase, we obtain preliminary transcript counts that capture the main structure of the data. However, processing every individual fragment repeatedly is computationally expensive and unnecessary. Instead, fragments are grouped into equivalence classes based on their mapping profiles—fragments that map to the same set of transcripts with similar conditional probabilities are aggregated together. This reduction in data dimensionality allows the offline phase to efficiently re-optimize the abundance estimates by working on these groups rather than the entire dataset.

#### Equivalence Classes and Likelihood Factorization

Let $C = \{C_1, C_2, \dots, C_K\}$ denote the set of equivalence classes. For each equivalence class $C_j$, we define:

-   $d_j = |C_j|$, the total number of fragments in the class.
-   A weight vector $\mathbf{w}_j$ such that $w_{j,t}$ is the average conditional probability $\Pr\{ f \mid t \}$ for fragments in $C_j$ with respect to transcript $t$.

Using these equivalence classes, the overall likelihood function can be factorized as:

$$
L(\pmb{\tau}) \propto \prod_{j=1}^{K} \left( \sum_{t \in T_j} w_{j,t} \, \tau_t \right)^{d_j},
$$

where:

- $\tau_t$ is the relative abundance for transcript $t$ (with $\sum_{t} \tau_t = 1$),
- $T_j$ is the set of transcripts to which fragments in $C_j$ map.

This factorization reduces the computational burden, as the likelihood now involves summations over equivalence classes rather than over millions of individual fragments.

### EM Algorithm for Offline Refinement

The offline phase typically employs an iterative EM (Expectation–Maximization) algorithm to maximize the above likelihood function. The process involves two main steps:

#### Expectation Step (E-Step)
For each equivalence class $C_j$ and transcript $t \in T_j$, the algorithm computes the expected contribution of $C_j$ to the count of transcript $t$ using the current abundance estimates. This is given by:

$$
E_{j,t} = d_j \frac{w_{j,t} \, \tau_t}{\sum_{r \in T_j} w_{j,r} \, \tau_r}.
$$

This term represents the fraction of the $d_j$ fragments in $C_j$ that are expected to originate from transcript $t$.

#### Maximization Step (M-Step)
Using the expected contributions from the E-step, the counts for each transcript are updated:

$$
\alpha_t^{(\text{new})} = \sum_{j=1}^{K} E_{j,t}.
$$

The relative abundance estimates are then obtained by normalizing these counts:

$$
\tau_t = \frac{\alpha_t^{(\text{new})}}{\sum_{r \in T} \alpha_r^{(\text{new})}}.
$$

These steps are iterated until convergence—typically defined as the point where the maximum relative change in the estimated counts between iterations falls below a predetermined threshold.

### Variational Bayesian Extensions

In some implementations, a variational Bayesian (VB) version of the EM algorithm is used in the offline phase. This approach not only provides point estimates for transcript abundances but also approximates the posterior distribution of these estimates. Such a posterior can be useful for quantifying the uncertainty in transcript abundance estimates, offering richer information for downstream analyses.

### Summary

The offline inference phase takes the initial, coarse estimates from the online phase and refines them by:
- **Aggregating fragments into equivalence classes:** This reduction captures essential information while significantly lowering computational costs.
- **Applying an iterative EM algorithm:** The E-step computes expected fragment contributions, and the M-step updates the abundance estimates until convergence.
- **Optionally using variational Bayesian methods:** These methods yield both point estimates and uncertainty measures.

By leveraging these techniques, the offline phase ensures that the final transcript abundance estimates are both highly accurate and computationally tractable, even when working with extremely large RNA-seq datasets.

<!-- REFERENCES -->

[^salmon-github]: [Salmon repository on GitHub](https://github.com/COMBINE-lab/salmon)
[^patro2017salmon]: Patro, R., Duggal, G., Love, M. I., Irizarry, R. A., & Kingsford, C. (2017). Salmon provides fast and bias-aware quantification of transcript expression. *Nature methods, 14*(4), 417-419. doi: [10.1038/nmeth.4197](https://doi.org/10.1038/nmeth.4197)
[^li2010rna]: Li, B., Ruotti, V., Stewart, R. M., Thomson, J. A., & Dewey, C. N. (2010). RNA-Seq gene expression estimation with read mapping uncertainty. *Bioinformatics, 26*(4), 493-500. doi: [10.1093/bioinformatics/btp692](https://doi.org/10.1093/bioinformatics/btp692)
