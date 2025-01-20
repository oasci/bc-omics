---
title: Quantification
type: docs
weight: 2
---


Performing RNA quantification is an essential step beyond [read mapping][read-mapping] in RNA sequencing (RNA-seq) studies.
Quantifying RNA transcripts serves several crucial purposes that significantly enhance the value and applicability of the sequencing data.
While [read mapping][read-mapping] is a foundational step in RNA-seq data analysis, it primarily serves to locate the origin of each read within the genome.
However, mapping alone does not provide a complete picture of gene expression levels or the functional implications of the sequencing data.
Here’s why RNA quantification is performed and why it's important.

1.  **Quantitative Insights into Gene Expression**: RNA quantification translates the raw counts of mapped reads into meaningful expression levels for each gene or transcript.
    This allows researchers to quantitatively compare gene expression across different samples, conditions, or time points.
    Quantification is essential for identifying differentially expressed genes, indicating biological responses to diseases, treatments, or environmental changes.
2.  **Normalization of Data**: RNA quantification involves normalization steps that correct for various biases and differences in sequencing depth across samples.
    This is crucial for making accurate comparisons of gene expression levels between samples.
    Without normalization, differences in read counts could reflect variations in sequencing effort rather than true differences in gene expression.
3.  **Functional Analysis and Interpretation**: Quantified expression levels enable functional analyses such as pathway enrichment and gene ontology analyses.
    These analyses help understand the biological processes, cellular components, and molecular functions associated with differentially expressed genes, providing insights into the underlying biology of the study.
4.  **Discovery of Novel Transcripts and Isoforms**: RNA quantification can help identify and quantify known genes, novel transcripts, and alternative splicing events.
    This expands our understanding of the transcriptome complexity and how alternative splicing contributes to gene regulation and cellular diversity.
5.  **Comparison Across Studies and Conditions**: Standardized quantification methods allow for comparing gene expression data across different studies, labs, and experimental conditions.
    This is critical for replicating findings, validating hypotheses, and integrating data from multiple sources for meta-analyses.

[read-mapping]: ../mapping/
