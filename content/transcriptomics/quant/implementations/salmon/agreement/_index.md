---
title: Fragment-transcript agreement
type: docs
weight: 3
---

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

## Fragment Length Probability $\Pr\{ \ell \mid t_i \}$

This term represents the likelihood of observing a fragment of a given length $\ell$ from transcript $t_i$. It is derived from the empirical fragment length distribution, acknowledging that some fragment lengths are inherently more likely than others.

## Positional Probability $\Pr\{ p \mid t_i, \ell \}$

Not all positions along a transcript are equally likely to yield a complete fragment. This probability quantifies the chance that a fragment starting at position $p$ is generated from transcript $t_i$, taking into account the effective length of the transcript. It corrects for edge effects where the likelihood of generating a full-length fragment decreases near the transcript boundaries.

## Orientation Probability $\Pr\{ o \mid t_i \}$

For strand-specific RNA-seq protocols, the orientation $o$ is critical. This term reflects the probability that a fragment is generated with the correct strand orientation relative to transcript $t_i$.

### Alignment Quality $\Pr\{ a \mid f_j, t_i, p, o, \ell \}$

When alignment data is available, this term evaluates how well fragment $f_j$ aligns to transcript $t_i$ given its position $p$, orientation $o$, and length $\ell$. In cases where a fast mapping method (such as quasi-mapping) is used, this term is typically set to 1. Otherwise, it is computed based on the quality of the match between the fragment and the transcript sequence.

## Integrating Fragment–Transcript Agreement

The individual components discussed above together yield a comprehensive measure of how likely it is that a fragment $f_j$ originates from a transcript $t_i$. This probability is fundamental to the next step of the model—constructing the overall likelihood function. By understanding these detailed contributions, we can better appreciate how the likelihood of the entire set of observed fragments is built up from the fragment–transcript agreement probabilities.
