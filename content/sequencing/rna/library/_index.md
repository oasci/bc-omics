---
title: RNA-seq library
type: docs
---


The purpose of an RNA-seq library is to enable the comprehensive analysis of an organism's transcriptome through high-throughput sequencing.
We must collect, process, and prepare RNA molecules for downstream sequencing.

## Avoiding RNA degradation

Working with RNA presents unique challenges due to its inherently unstable nature and the widespread presence of ribonucleases (RNases) in cells, tissues, and environmental surfaces, which can rapidly degrade RNA molecules.[^mp-bio-rna-extract]
These enzymes are remarkably resilient and can significantly compromise the integrity of RNA samples if not adequately managed.
Therefore, maintaining an RNase-free environment and handling practices is crucial in RNA extraction and downstream applications to ensure the quality and reliability of experimental results.
Here are several key strategies to prevent RNA degradation:

1.  **Decontaminate Work Surfaces and Equipment.**
    Before beginning any RNA work, thoroughly clean all work surfaces, pipettors, and equipment with 70% ethanol and 3% hydrogen peroxide.
    This step is vital for removing potential RNase contamination.
    Products specifically designed for neutralizing RNases, such as RNase Erase decontamination solution, can be highly effective.
2.  **Use Personal Protective Equipment (PPE).**
    Wearing gloves is essential to protect your RNA samples from RNases that might be present on your skin.
    Changing gloves frequently is advisable, especially after touching potentially contaminated surfaces or materials.
3.  **Employ RNase-Free Consumables.**
    Ensure all reagents, tubes, pipette tips, and other consumables are RNase-free.
    Many suppliers provide certified RNase-free products, reducing the risk of introducing RNases into your samples.
4.  **Temperature Control.**
    RNA is less stable at higher temperatures, so keeping samples cold throughout the extraction process is crucial.
    Use ice or a cold block to keep samples and reagents chilled unless a specific step in your protocol requires room temperature or elevated temperatures.
5.  **Efficient Workflow.**
    Plan and organize your workflow before starting the extraction process.
    Having all necessary reagents, equipment, and consumables ready and within reach can minimize the time your RNA samples are exposed to potential RNase activity and reduce the risk of degradation.

By following these guidelines, you can significantly reduce the risk of RNA degradation and improve the success of your RNA extraction and subsequent analyses. Remember, meticulous attention to detail and strict adherence to RNase-free techniques are vital to preserving the integrity of your RNA samples.

## RNA extraction

The process of RNA extraction can be carried out through several approaches, including organic extraction with agents such as TRIzol, the use of RNA extraction kits featuring filter-based spin columns and lysis buffers, or the employment of magnetic particle methods.
A DNase treatment is administered to eliminate the presence of any DNA remnants within the RNA sample. This crucial step ensures the RNA-seq library is devoid of DNA contaminants, vital for accurate sequencing outcomes.
Maintaining the RNA in an environment free from RNase is imperative to preserve its integrity.

### Selection of RNA species

Before embarking on RNA-Seq library construction, selecting an optimal library preparation protocol is pivotal.
This protocol should either enrich or deplete the "total" RNA sample for specific RNA species.
The total RNA pool comprises ribosomal RNA (rRNA), precursor messenger RNA (pre-mRNA), mRNA, and various noncoding RNA (ncRNA) classes.
In most cell types, rRNA dominates, often representing over 95% of all cellular RNA.
Without removing rRNA before library construction, these transcripts would dominate sequencing efforts.
This dominance would significantly reduce the sequencing depth and limit the detectability of less abundant RNA species.
Hence, the effective elimination of rRNA is essential for accurate transcriptome profiling.

Many protocols concentrate on enriching mRNA molecules by targeting the 3′ poly-A tail of mRNA molecules.
This targeting is achieved using poly-T oligos attached to a substrate, such as magnetic beads.
An alternative strategy involves the selective depletion of rRNA using commercially available kits, like RiboMinus (Life Technologies) or RiboZero (Epicentre).
This approach is particularly advantageous for the accurate quantification of noncoding RNA species, which, being potentially polyadenylated, might be omitted from poly-A enriched libraries.
These strategies ensure a more comprehensive and precise transcriptome analysis by focusing sequencing resources on the RNA species of interest.

## Complementary DNA

The conversion of RNA into complementary DNA (cDNA) is fundamental for several reasons that bolster the integrity and utility of the sequencing process.

RNA molecules are naturally less stable and more susceptible to degradation than DNA.
This inherent instability could potentially compromise the sequencing outcomes.
The transformation of RNA into cDNA addresses this issue by significantly enhancing the library's stability and durability, thereby ensuring the reliability of downstream processing and sequencing operations.

The vast majority of high-throughput sequencing platforms are primarily designed for DNA analysis.
By converting RNA to cDNA, the samples become compatible with these technologies.
This compatibility facilitates a comprehensive transcriptome analysis, enabling researchers to delve deeper into genetic expressions and variations.

The conversion process involves reverse transcription, where RNA is transformed into cDNA, followed by an amplification stage.
These steps are essential, particularly for samples with low input or those derived from single cells, as they ensure that even transcripts present in minimal amounts are adequately represented for sequencing.
This amplification is crucial for detecting and quantifying transcripts, playing a pivotal role in the success of sequencing efforts.

<!-- REFERENCES -->

[^sarantopoulou2019comparative]: Sarantopoulou, D., Tang, S. Y., Ricciotti, E., Lahens, N. F., Lekkas, D., Schug, J., ... & Grant, G. R. (2019). Comparative evaluation of RNA-Seq library preparation methods for strand-specificity and low input. Scientific reports, 9(1), 13477. doi: [10.1038/s41598-019-49889-1](https://doi.org/10.1038/s41598-019-49889-1)
[^berge2019rna]: Van den Berge, K., Hembach, K. M., Soneson, C., Tiberi, S., Clement, L., Love, M. I., ... & Robinson, M. D. (2019). RNA sequencing data: hitchhiker's guide to expression analysis. *Annual Review of Biomedical Data Science, 2*, 139-173. doi: [10.1146/annurev-biodatasci-072018-021255](https://doi.org/10.1146/annurev-biodatasci-072018-021255)
[^hrdlickova2017rna]: Hrdlickova, R., Toloue, M., & Tian, B. (2017). RNA‐Seq methods for transcriptome analysis. Wiley Interdisciplinary Reviews: RNA, 8(1), e1364. doi: [10.1002/wrna.1364](https://doi.org/10.1002/wrna.1364)
[^han2015advanced]: Han, Y., Gao, S., Muegge, K., Zhang, W., & Zhou, B. (2015). Advanced applications of RNA sequencing and challenges. Bioinformatics and biology insights, 9, BBI-S28991. doi: [10.4137/BBI.S28991](https://doi.org/10.4137/BBI.S28991)
[^kukurba2015rna]: Kukurba, K. R., & Montgomery, S. B. (2015). RNA sequencing and analysis. Cold Spring Harbor Protocols, 2015(11), pdb-top084970. doi: [10.1101/pdb.top084970](https://doi.org/10.1101/pdb.top084970)
[^robles2012efficient]: Robles, J. A., Qureshi, S. E., Stephen, S. J., Wilson, S. R., Burden, C. J., & Taylor, J. M. (2012). Efficient experimental design and analysis strategies for the detection of differential expression using RNA-Sequencing. BMC genomics, 13(1), 1-14. doi: [10.1186/1471-2164-13-484](https://doi.org/10.1186/1471-2164-13-484)
[^wang2009rna]: Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature reviews genetics, 10(1), 57-63. doi: [10.1038/nrg2484](https://doi.org/10.1038/nrg2484)
