---
title: Likelihood function
type: docs
weight: 4
---

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
