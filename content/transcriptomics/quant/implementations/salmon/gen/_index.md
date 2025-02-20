---
title: Generative model
type: docs
weight: 2
---

The generative model underlying Salmon is designed to mirror the biological process that produces RNA fragments during sequencing while also incorporating adjustments for technical biases that arise during library preparation and sequencing.
This model forms the foundation for estimating transcript abundances by describing how fragments are generated from the transcriptome and by correcting for distortions due to various biases.

The model has two main objectives:

1.  **Capturing Fragment Generation:**  
    It represents the inherent randomness in how RNA fragments are produced from transcripts.
    Each fragment is assumed to originate from a particular transcript in proportion to that transcript’s true abundance and its effective length (which accounts for the fact that not all regions of a transcript are equally likely to yield a complete fragment).
2.  **Incorporating Bias Corrections:**  
    The model adjusts for technical biases that can affect which fragments are observed.
    These include sequence-specific biases (often at the fragment ends), GC-content bias, and biases related to fragment length.
    By modeling these factors, the method corrects for systematic distortions that might otherwise lead to inaccurate estimates of transcript abundance.

## Transcript-fragment assignment matrix

The transcript–fragment assignment matrix is a fundamental data structure in Salmon that bridges the gap between the observed RNA-seq fragments and the underlying transcriptome.
This matrix encapsulates the uncertainty inherent in fragment mapping by representing, for each fragment, the set of transcripts to which it could potentially belong.

Denote the matrix as \(\mathbf{Z}\) with dimensions \(M \times N\), where:

-   \(M\) is the number of transcripts in the reference transcriptome,
-   \(N\) is the number of sequenced fragments.

Each element \(z_{ij}\) of the matrix is defined as:

$$
z_{ij} =
\begin{cases}
1, & \text{if fragment } f_j \text{ is assigned to transcript } t_i, \\
0, & \text{otherwise.}
\end{cases}
$$

In practice, because many fragments may map ambiguously to multiple transcripts, \(\mathbf{Z}\) is often interpreted in a probabilistic sense.
Instead of hard binary assignments, each entry \(z_{ij}\) can represent the probability or weight that fragment \(f_j\) originates from transcript \(t_i\). These probabilities are computed based on factors such as:

-   The fragment–transcript agreement, which accounts for fragment length, starting position, and orientation.
-   Bias correction factors that adjust for sequence-specific and GC-content effects.

Consider a simple scenario with three transcripts, \(t_1\), \(t_2\), and \(t_3\), and four fragments, \(f_1\), \(f_2\), \(f_3\), and \(f_4\). The matrix \(\mathbf{Z}\) might look like this when using hard assignments:

$$
\mathbf{Z} =
\begin{pmatrix}
1 & 0 & 1 & 0 \\
0 & 1 & 0 & 1 \\
0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

This indicates that:
- Fragment \(f_1\) is assigned to transcript \(t_1\).
- Fragment \(f_2\) is assigned to transcript \(t_2\).
- Fragment \(f_3\) is assigned to transcript \(t_1\).
- Fragment \(f_4\) is assigned to transcript \(t_2\).

However, in real RNA-seq data, many fragments may align to more than one transcript. For instance, if fragment \(f_3\) could plausibly originate from both \(t_1\) and \(t_2\), the matrix might instead be represented with probabilistic weights:

$$
\mathbf{Z} =
\begin{pmatrix}
1 & 0 & 0.6 & 0 \\
0 & 1 & 0.4 & 1 \\
0 & 0 & 0 & 0 \\
\end{pmatrix}
$$

In this example:
- \(f_3\) is assigned to both \(t_1\) and \(t_2\) with probabilities 0.6 and 0.4, respectively.
- Fragments \(f_1\), \(f_2\), and \(f_4\) have clear, unambiguous assignments.

The transcript–fragment assignment matrix \(\mathbf{Z}\) is critical for quantifying transcript abundances because it links each fragment to one or more transcripts. The total contribution of fragments to a particular transcript \(t_i\) can be summed across all fragments:

$$
\alpha_i = \sum_{j=1}^{N} z_{ij},
$$

where \(\alpha_i\) serves as an intermediate count used to estimate the relative abundance of \(t_i\). When using probabilistic weights, this sum represents the expected count of fragments that originated from transcript \(t_i\). These counts are subsequently normalized to derive relative abundances:

$$
\tau_i = \frac{\alpha_i}{\sum_{r=1}^{M} \alpha_r}.
$$

**Practical Considerations:**

-   **Ambiguity Handling:**
    RNA-seq fragments often map to multiple transcripts, especially when there are shared exons or homologous sequences. The assignment matrix \(\mathbf{Z}\) captures this ambiguity by assigning weights rather than making a binary choice. This probabilistic framework allows for more nuanced estimates that reflect the inherent uncertainty in the mapping process.
-   **Computational Efficiency:**
    In practice, the matrix \(\mathbf{Z}\) is typically sparse because most fragments map to only a small subset of transcripts. This sparsity is exploited by computational algorithms to reduce memory usage and speed up calculations.
-   **Integration with Bias Models:**
    The conditional probabilities in \(\mathbf{Z}\) are not computed in isolation. They are adjusted using bias correction factors derived from sequence-specific, GC-content, and fragment length considerations. This integration ensures that the mapping probabilities accurately reflect both the biological process and the technical characteristics of the sequencing experiment.

## Transcript abundance vector

The transcript abundance vector is a central component in Salmon's model, representing the relative expression levels of the transcripts in the sample. This vector encapsulates our estimates of how much each transcript contributes to the overall pool of RNA molecules, and it directly informs downstream analyses such as differential expression.

The transcript abundance vector is typically denoted as \(\pmb{\eta}\) (or sometimes \(\pmb{\tau}\) when expressed as relative abundances). It is an \(M\)-dimensional vector, where \(M\) is the number of transcripts in the reference transcriptome. Each element \(\eta_i\) corresponds to transcript \(t_i\) and represents its fraction of the total RNA, taking into account both the true copy number and the effective length of the transcript.

Mathematically, the abundance of transcript \(t_i\) is given by:

$$
\eta_i = \frac{c_i \cdot \ell^\circ_i}{\sum_{j=1}^{M} c_j \cdot \ell^\circ_j},
$$

where:
- \(c_i\) is the true copy number (or count) of transcript \(t_i\) in the sample.
- \(\ell^\circ_i\) is the effective length of transcript \(t_i\), which adjusts the physical length \(\ell_i\) to account for the fact that fragments near the transcript ends are less likely to yield a complete fragment.
- The denominator is a normalization factor ensuring that the sum of all \(\eta_i\) is 1, thereby forming a probability distribution over the transcripts.

Imagine a simple transcriptome with three transcripts: \(t_1\), \(t_2\), and \(t_3\). Suppose the true copy numbers (or relative expression levels) are 100, 200, and 50, respectively, and the effective lengths are 1000, 1500, and 800 bases. The unnormalized contributions from each transcript are then:

- For \(t_1\): \(100 \times 1000 = 100{,}000\)
- For \(t_2\): \(200 \times 1500 = 300{,}000\)
- For \(t_3\): \(50 \times 800 = 40{,}000\)

The total contribution is \(100{,}000 + 300{,}000 + 40{,}000 = 440{,}000\). The transcript abundance vector \(\pmb{\eta}\) is therefore:

$$
\eta_1 = \frac{100{,}000}{440{,}000} \approx 0.227, \quad
\eta_2 = \frac{300{,}000}{440{,}000} \approx 0.682, \quad
\eta_3 = \frac{40{,}000}{440{,}000} \approx 0.091.
$$

This vector indicates that \(t_2\) is the most abundant transcript, contributing about 68.2% of the total RNA, while \(t_1\) and \(t_3\) contribute approximately 22.7% and 9.1%, respectively.

The transcript abundance vector is a key parameter in the generative model because it directly affects the probability of observing a given RNA fragment. Under the model, fragments are generated from transcripts in proportion to their nucleotide fractions, which are given by \(\eta_i\). In other words, if a transcript is more abundant, it will contribute more fragments to the overall pool. This relationship is captured in the likelihood function of the generative model, which is used to infer the best estimates of \(\pmb{\eta}\) based on the observed data.

**Practical Considerations**

-   Normalization ensures that the transcript abundances form a proper probability distribution (i.e., they sum to 1). This is critical for comparing relative expression levels across different transcripts and for interpreting downstream results.
-   The effective length \(\ell^\circ_i\) is used instead of the physical transcript length \(\ell_i\) because it better captures the likelihood of a fragment being generated from a transcript. This correction is essential for obtaining unbiased abundance estimates, especially when fragment generation is affected by edge effects.
-   Throughout the inference process, the abundance vector is updated as more fragments are processed. This dynamic updating allows the algorithm to refine its estimates in real time, accommodating the complexities and biases inherent in RNA-seq data.

## Rich Equivalence Classes

Rich equivalence classes are a key data structure used by Salmon to manage and summarize the vast number of RNA-seq fragments efficiently.
By grouping fragments that exhibit similar mapping behaviors, these equivalence classes reduce the computational complexity of downstream inference without sacrificing critical information about fragment-to-transcript relationships.

In RNA-seq data, individual fragments often map to multiple transcripts due to shared exons, gene families, or homologous regions. Processing each fragment separately in the full likelihood function can be computationally prohibitive when millions of fragments are involved. Rich equivalence classes address this challenge by clustering fragments that have the same set of potential transcript origins and similar mapping probabilities into a single group. This grouping allows Salmon to:

- **Compress the Data:** Instead of processing every fragment individually, the algorithm works with a smaller set of equivalence classes.
- **Preserve Information:** Each equivalence class retains both the count of fragments and detailed information about the mapping probabilities across transcripts.
- **Accelerate Inference:** By replacing a sum over millions of fragments with a sum over a much smaller number of classes, computation is significantly expedited.

Let $C = \{ C_1, C_2, \dots, C_K \}$ denote the set of equivalence classes, where $K$ is typically much smaller than the total number of fragments $N$.

For each equivalence class $C_j$:
- **Fragment Count ($d_j$)**:  
  This is the total number of fragments in $C_j$. For example, if 1,000 fragments share the same mapping profile, then $d_j = 1000$.
  
- **Weight Vector ($\mathbf{w}_j$)**:  
  The weight vector $\mathbf{w}_j$ has entries $w_{j,t}$ corresponding to each transcript $t$ that fragments in $C_j$ can map to. Each $w_{j,t}$ represents the average conditional probability $\Pr\{ f \mid t \}$ for fragments in that equivalence class mapping to transcript $t$.

Consider a simplified scenario with three transcripts $t_1$, $t_2$, and $t_3$, and suppose we have the following fragments:

- Fragments $f_1, f_2,$ and $f_3$ all map to both $t_1$ and $t_2$ with similar conditional probabilities.
- Fragments $f_4$ and $f_5$ map uniquely to $t_3$.

In this case, the fragments $f_1, f_2, f_3$ would be grouped into an equivalence class $C_1$ with:

- $d_1 = 3$ (the number of fragments in the class),
- A weight vector $\mathbf{w}_1$ such that, for instance, $w_{1,t_1} = 0.7$ and $w_{1,t_2} = 0.3$ (indicating that, on average, a fragment in $C_1$ has a 70% chance of originating from $t_1$ and a 30% chance from $t_2$).

Meanwhile, fragments $f_4$ and $f_5$ would each form (or be grouped into) an equivalence class $C_2$ with:

- $d_2 = 2$,
- A weight vector $\mathbf{w}_2$ where $w_{2,t_3} = 1.0$ (since these fragments map uniquely to $t_3$).

The benefit of rich equivalence classes becomes evident in the factorization of the likelihood function. Instead of summing over each individual fragment, the likelihood can be reformulated in terms of the equivalence classes:

$$
L(\pmb{\tau}) \propto \prod_{j=1}^{K} \left( \sum_{t \in T_j} w_{j,t} \, \tau_t \right)^{d_j},
$$

where:

- $\tau_t$ is the relative abundance of transcript $t$,
- $T_j$ is the set of transcripts that the fragments in equivalence class $C_j$ can map to,
- $w_{j,t}$ are the entries of the weight vector $\mathbf{w}_j$, and
- $d_j$ is the number of fragments in $C_j$.

This reformulation drastically reduces the computational burden since the product now runs over $K$ equivalence classes rather than over $N$ individual fragments.
