---
title: Bias corrections
type: docs
weight: 5
---

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
