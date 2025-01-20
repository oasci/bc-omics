---
title: Problem formulation
type: docs
---


Formulating the problem of RNA quantification in the context of gene expression analysis involves determining the abundance of transcripts in a biological sample.
This process is pivotal for understanding gene regulation, cellular responses, and the molecular underpinnings of disease.
The challenge lies in accurately measuring the relative quantities of thousands of different RNA molecules from a complex mixture derived from sequencing experiments.

The foundational concept in addressing this challenge is to consider the transcriptome as a collection of unique transcripts, each representing a gene or a variant of a gene being expressed in the sample.
The goal is to quantify the fraction of the total RNA pool that each transcript represents, which informs us about the gene's expression level.
However, direct quantification is complicated by several factors, including the variable length of transcripts and the technical biases introduced during the sequencing process.

## True transcriptome

First, we define the true transcriptome ($T$) as the complete set of transcripts present in the sample being studied.
$T$ encompasses the exact composition of RNA molecules in the sample, including all different isoforms (variations of genes) that exist.
We mathematically define $T$ as

$$
\left\{ \left( t_1, \ldots, t_M \right), \left( c_1, \ldots, c_M \right) \right\}.
$$

where $t_i$ is some transcript nucleotide sequence $i$ with $c_i$ copies with a total of $M$ transcripts.

!!! example

    | $i$ | $t_i$ | $c_i$ |
    | --- | ----- | ----- |
    | 1 | AATCGGCT | 3 |
    | 2 | AATCGGCC | 2 |
    | 3 | TTCGGCAA | 1 |

Essentially, it is a set of all transcripts and how many copies there are.
We could also write

$$
T = \left\{ \left( t_1, c_1 \right), \left( t_2, c_2 \right), \ldots, \left( t_M, c_M \right) \right\}.
$$

These metrics are purely theoretical and represent the absolute expression.
Remember, we are normally interested in changes of expression (e.g., unchanged, upgregulated, downregulated) and not specifically the absolute number of each isoform.
One example is the nucleotide fraction.

## Nucleotide fraction

The nucleotide fraction, denoted as $\eta_i$, is defined as the proportion of nucleotides in the sample originating from a copy of transcript $i$.
This quantity is computed based on the number of copies of the transcript, $c_i$, and its effective length, $\widetilde{l_i}$.
The formula for calculating the nucleotide fraction is given by:

$$
\eta_i = \frac{c_i \cdot \widetilde{l_i}}{\sum_{j=1}^{M} c_j \cdot \widetilde{l_j}}
$$

This fraction represents the probability of drawing a sequencing fragment from some position on a particular transcript, normalized by the effective transcript length to account for the varying lengths of transcripts.

## Effective transcript length

The difference between length and effective length in the context of transcript abundance estimation from RNA-seq data involves how these measurements account for the practicalities of sequencing and data analysis.

Length refers to the actual length of the transcript in nucleotides.
This is a straightforward measurement that does not consider any factors related to how the transcript might be sequenced or analyzed.

**Effective length**, on the other hand, is adjusted to account for the empirical distribution of fragment lengths obtained during sequencing.
This adjustment is necessary because the range of fragment sizes that can be sampled from a transcript is limited, particularly near the ends of the transcript.
The effective length therefore accounts for the fact that not all regions of a transcript are equally likely to be sampled, especially for longer transcripts or those sequenced with certain techniques that generate fragments of specific lengths.

We define effective length of transcript $t_i$ as

$$
\widetilde{l_i} = l_i - \mu_d^{l_i}
$$

where $\mu_d^{l_i}$ is the mean of the truncated empirical fragment length distribution, $d$.

The mean of the truncated empirical fragment length distribution, denoted as $\mu_{d_{l_i}}$, is calculated from the empirical fragment length distribution that has been truncated to consider only those lengths that are actually observable given the length of the transcript. This mean is a crucial parameter for determining the effective length of a transcript, which in turn is used for calculating various metrics of RNA quantification, such as the nucleotide and transcript fractions.

The calculation of $\mu_{d_{l_i}}$ is defined as follows:

$$
\mu_{d}^{l_i} = \frac{\sum_{j=1}^{l_i} j \cdot Pr\{X = j\}}{\sum_{k=1}^{l_i} Pr\{X = k\}}
$$

where:

-   $l_i$ is the length of transcript $i$.
-   $Pr\{X = j\}$ is the probability of drawing a fragment of length $j$ under the empirical fragment length distribution $d$.
-   The numerator sums the product of each fragment length $j$ and its probability of being drawn, for all possible fragment lengths up to the length of the transcript $l_i$.
-   The denominator sums the probabilities of drawing a fragment of any length $k$ up to the length of the transcript, effectively normalizing the mean to account for the fact that not all fragment lengths are equally likely.

This mean reflects the average fragment length expected to be observed from transcript $i$, taking into account the distribution of fragment lengths as well as the physical constraints imposed by the transcript's length. This parameter is essential for accurately estimating the effective length of transcripts, which is used in the calculation of transcript abundance metrics in RNA sequencing data analysis.

## Transcript fraction

The transcript fraction, denoted as $\tau_i$, is obtained by normalizing the nucleotide fraction $\eta_i$ by the effective transcript length $\widetilde{l_i}$. The formula for calculating the transcript fraction is given by:

$$
\tau_i = \frac{\frac{\eta_i}{\widetilde{l_i}}}{\frac{c_i}{\sum_{j=1}^{M} c_j \cdot \widetilde{l_j}}}
$$

This quantity represents the fraction of transcripts in the sample that originate from a given transcript $i$, normalized by the effective lengths of all transcripts.
These values can be used to directly compute measures of relative transcript abundance, such as transcripts per million (TPM), providing a normalized measure that facilitates comparison across different samples or experiments.

Once you have the transcript fraction ($\tau_i$), the TPM for a transcript $t_i$ is calculated as:

$$
\text{TPM}_i = \tau_i \times 10^6
$$

This formula adjusts the transcript fraction to a scale of 1 million to facilitate comparison across samples or conditions.
