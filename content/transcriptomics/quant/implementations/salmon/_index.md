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

### Online

The online inference phase of Salmon's algorithm is designed to tackle the challenge of estimating transcript abundances from RNA-sequencing data.
This phase employs a variant of stochastic collapsed variational Bayesian inference to optimize a collapsed variational objective function.
The inference procedure operates as a streaming algorithm, updating estimated read counts after processing small groups of observations (mini-batches).
These updates are done asynchronously and in parallel, aiming to make efficient use of computational resources.

During the online phase, Salmon estimates initial expression levels, auxiliary parameters, and foreground bias models.
It also constructs equivalence classes over the input fragments, which serve as a highly reduced representation of the sequencing experiment.
This strategy helps manage the complexity of the data by grouping together fragments that provide similar information about transcript abundances.

The key aspects of the online phase include:

1.  **Streaming Inference**: The algorithm processes data in mini-batches, allowing for efficient and parallel processing. This approach helps Salmon to quickly adjust its estimates of transcript abundances as more data are processed.
2.  **Variational Bayesian Inference**: By employing a form of variational Bayesian inference, Salmon approximates the posterior distribution of transcript abundances. This statistical framework allows for the incorporation of prior knowledge and the estimation of uncertainty in the abundance estimates.
3.  **Equivalence Classes**: Salmon groups together sequenced fragments into equivalence classes based on their compatibility with the same set of transcripts. This reduces the computational complexity of the inference process and enables more efficient optimization.
4.  **Bias Models**: The online phase involves the estimation of models to correct for known biases in the sequencing data. These in clude sequence-specific biases and biases related to the sequencing process itself. By correcting for these biases, Salmon aims to produce more accurate estimates of transcript abundances.
5.  **Adaptation to Data**: The algorithm dynamically updates its estimates and models based on the data observed in each mini-batch. This adaptive approach allows Salmon to refine its predictions as more information becomes available.

In summary, the online inference phase of Salmon is a sophisticated computational strategy designed to accurately estimate transcript abundances from RNA-seq data. By leveraging variational Bayesian inference and efficient data processing techniques, Salmon addresses the challenges of bias correction and data complexity, ultimately aiming to provide accurate and reliable estimates of transcript abundances in a computationally efficient manner.

### Offline

Offline inference describes a computational process that takes place after the initial, or "online," analysis of RNA sequencing data by the Salmon software. This phase leverages the data and preliminary analyses obtained from the online phase to refine the estimates of transcript abundance, essentially polishing the results for greater accuracy.

-   **Rich Equivalence Classes**: In the offline phase, Salmon utilizes "rich equivalence classes" constructed during the online phase. These classes group fragments (reads or parts of reads from sequencing) that are likely to come from the same set of transcripts, thereby reducing computational complexity and focusing efforts on distinguishing between transcripts that share many fragments in common.
-   **Expectation-Maximization (EM) Algorithm**: The core of the offline inference phase is an optimization process using the EM algorithm. This algorithm iteratively improves the estimates of how many fragments come from each transcript, effectively fine-tuning the abundance measurements. It does this by maximizing the likelihood of observing the given data under the model, adjusting transcript abundance estimates to fit the observed data better.
-   **Variational Bayes Optimization**: Optionally, Salmon can perform variational Bayesian (VB) optimization instead of standard EM updates. This approach involves approximating the true posterior distribution of transcript abundances with a simpler distribution, then iteratively updating this approximation to make it as close as possible to the true posterior. This method is particularly useful for managing computational complexity and uncertainty.
-   **Convergence Criterion**: The offline phase continues iterating until the changes in the estimates of transcript abundance fall below a pre-defined threshold, indicating that further iterations are unlikely to significantly alter the results. This criterion ensures that the algorithm stops when it has effectively converged on a stable solution.

#### Posterior sampling

Posterior sampling details a statistical method used in the offline phase of the Salmon software to estimate the distribution of transcript abundances from RNA sequencing data. This method allows for the quantification of the uncertainty in transcript abundance estimates, providing more than just point estimates.

-   **Gibbs Sampling**: This is a Markov Chain Monte Carlo (MCMC) algorithm used to generate a sequence of samples from the posterior distribution of transcript abundances. Salmon's implementation of Gibbs sampling iteratively samples transcript abundances given the fragment assignments (i.e., which transcripts the sequenced fragments are likely to come from) and then reassigns fragments to transcripts based on these sampled abundances. This process helps in understanding the variability and confidence in the abundance estimates.
-   **Bootstrap Sampling**: An alternative method to Gibbs sampling, bootstrap sampling involves generating multiple resampled datasets from the original sequencing data by sampling with replacement. For each resampled dataset, the offline inference procedure is rerun to produce new estimates of transcript abundances. This method is used to assess the stability and reliability of the abundance estimates by observing how they vary across the resampled datasets.

<!-- REFERENCES -->

[^salmon-github]: [Salmon repository on GitHub](https://github.com/COMBINE-lab/salmon)
[^patro2017salmon]: Patro, R., Duggal, G., Love, M. I., Irizarry, R. A., & Kingsford, C. (2017). Salmon provides fast and bias-aware quantification of transcript expression. *Nature methods, 14*(4), 417-419. doi: [10.1038/nmeth.4197](https://doi.org/10.1038/nmeth.4197)
[^li2010rna]: Li, B., Ruotti, V., Stewart, R. M., Thomson, J. A., & Dewey, C. N. (2010). RNA-Seq gene expression estimation with read mapping uncertainty. *Bioinformatics, 26*(4), 493-500. doi: [10.1093/bioinformatics/btp692](https://doi.org/10.1093/bioinformatics/btp692)
