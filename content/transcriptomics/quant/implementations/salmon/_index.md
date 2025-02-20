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


<!-- REFERENCES -->

[^salmon-github]: [Salmon repository on GitHub](https://github.com/COMBINE-lab/salmon)
[^patro2017salmon]: Patro, R., Duggal, G., Love, M. I., Irizarry, R. A., & Kingsford, C. (2017). Salmon provides fast and bias-aware quantification of transcript expression. *Nature methods, 14*(4), 417-419. doi: [10.1038/nmeth.4197](https://doi.org/10.1038/nmeth.4197)
[^li2010rna]: Li, B., Ruotti, V., Stewart, R. M., Thomson, J. A., & Dewey, C. N. (2010). RNA-Seq gene expression estimation with read mapping uncertainty. *Bioinformatics, 26*(4), 493-500. doi: [10.1093/bioinformatics/btp692](https://doi.org/10.1093/bioinformatics/btp692)
