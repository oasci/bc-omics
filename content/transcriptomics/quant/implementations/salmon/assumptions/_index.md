---
title: Biological assumptions
type: docs
weight: 1
---

Understanding the biological foundations of our generative model is essential for grasping how transcript quantification is achieved.
In this section, we explain the basic assumptions about the transcriptome and the process of fragment generation, detailing how these elements combine to form the backbone of the model.

### Transcript set

Imagine the transcriptome as a library of all the RNA messages produced in a cell.
In our model, this library is represented by a set $T = \{t_1, t_2, \dots, t_M\}$, where each $t_i$ is a distinct transcript.
Each transcript is a string of nucleotides (A, C, G, and T/U) with a known physical length $\ell_i$.
This length tells us how many nucleotides make up each transcript and serves as a fundamental property in understanding how much of each transcript is present.

In a living cell, not all transcripts are produced in equal amounts.
The number of copies of each transcript $t_i$ is denoted by $c_i$.
These copy numbers represent the true biological abundance of each transcript, much like how a popular book might be printed in larger quantities than a niche title in a library.
They indicate which transcripts are more prevalent in the cell and are central to determining gene expression levels.

### Fragment generation

When the cell's RNA is sequenced, the process involves randomly sampling fragments from the entire pool of RNA molecules.
In an ideal, unbiased scenario, the likelihood of picking a fragment from any given transcript $t_i$ should be proportional to the number of its copies ($c_i$) and its length.
However, rather than using the raw length $\ell_i$, we use the effective length $\ell^\circ_i$, which reflects the fact that not all positions on a transcript are equally likely to produce a complete fragment.
The nucleotide fraction $\eta_i$ is defined as:

$$
\eta_i = \frac{c_i \cdot \ell^\circ_i}{\sum_{j=1}^{M} c_j \cdot \ell^\circ_j}
$$

This fraction represents the proportion of the total nucleotides in the sample that come from transcript $t_i$, thus serving as a key parameter in estimating its abundance.

The concept of effective transcript length accounts for practical limitations in fragment generation.
Although a transcript has a defined physical length $\ell_i$, not every nucleotide position is equally likely to yield a fragment that can be sequenced.
This is because fragments must have a certain length to be useful, and positions near the ends of a transcript may not allow for a full-length fragment to form.
Therefore, the effective length $\ell^\circ_i$ adjusts $\ell_i$ by considering the empirical distribution of fragment lengths observed in the sequencing experiment.
This adjustment helps correct for "edge effects" and ensures that the model more accurately reflects the regions of the transcript from which fragments can realistically be generated.
