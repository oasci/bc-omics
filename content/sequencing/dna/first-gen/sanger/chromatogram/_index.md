---
title: Chromatogram
type: docs
---


A chromatogram represents the migration of labeled sequencing products via capillary electrophoresis.
Fluorescence is detected at the end of the capillary, and signal intensity from four color channels, each representing a DNA base, is plotted on the y-axis relative to time on the x-axis.

> ![](https://media.labxchange.org/xblocks/lb-LabXchange-22c08d85-html-1/Sanger%20Sequencing%20Figures_Nicole-14.1624866693317-6ba38bd8669aa942be7db5f53a49c621.png)
> 
> An example of a sequencing chromatogram. Each DNA nucleotide, adenine, cytosine, guanine, and thymine, has its color on the chromatogram for visualization.

Most trace viewers show a processed version of the chromatogram; analysis software manipulates raw data from the sequencer to facilitate base calling.
The start of the processed trace, assigned position 1, is the software's best guess of the first peak.

### Trace start

The first 20 to 40 bases are typically not well resolved. Very short sequencing products do not migrate predictably during capillary electrophoresis, and the analysis software has difficulty assigning bases within this region, causing Ns to appear in the sequence. To avoid critical data falling in this region, we recommend designing primers that bind at least 60 bp, preferably 100 bp, away from critical bases. Note that the sequence of the primer will not be seen in the results, as bases within the primer are not labeled during the extension reaction.

> ![](https://www.azenta.com/sites/default/files/web-media-library/blog/analyzing-sanger-sequencing-data/fig_02_start-trace.png)
> 

### Trace middle

Most sequencing protocols are optimized to provide the best peak resolution between roughly 100 and 500 bases. Peaks should be sharp and well-spaced in this range, and the base calling is most reliable.

> ![](https://www.azenta.com/sites/default/files/web-media-library/blog/analyzing-sanger-sequencing-data/fig_03_middle-trace.png)
> 

### Trace end

Toward the end of the trace, expect peaks to be less defined and lower in intensity. The base calling will also be less reliable. Due to the nature of in vitro polymerization, larger sequencing products are generated less efficiently than their shorter counterparts. Thus, the larger products are fewer in number and produce a weaker signal. Also, with any electrophoresis method, it becomes increasingly difficult to resolve a single-base difference as DNA fragments become larger. For example, the difference in molecular weight between 100 bp and 101 bp is 1%, whereas it's just 0.1% between 1,000 bp and 1,001 bp.

> ![](https://www.azenta.com/sites/default/files/web-media-library/blog/analyzing-sanger-sequencing-data/fig_04_end-trace.png)
> 

### Dye blobs

Broad C and T peaks may be observed around position 80. Known as "dye blobs," these peaks represent aggregates of unincorporated dye terminators. Although most cleanup protocols are effective at removing leftover nucleotides after completion of the sequencing reaction, no method is 100% effective. Dye blobs are more frequently observed in inefficient sequencing reactions, with a higher fraction of unincorporated nucleotides and a low signal-to-noise ratio. Please note that the sequence within this region can often be determined by manual inspection of the chromatogram, even if the analysis software is unable to assign bases (i.e., Ns appear in the sequence). Suppose you need to sequence a key base, such as an SNP.
In that case, we recommend using primers that bind at least 100 bp away from the key base to avoid it falling within the dye blob region.

> ![](https://www.azenta.com/sites/default/files/web-media-library/blog/analyzing-sanger-sequencing-data/fig_07_dye-blobs.png)
> 

### Assigning bases

Once the sequencer collects the raw data, it's processed and analyzed by base-calling software. The four dyes used in Sanger sequencing have slightly different mobility properties due, in part, to their unequal molecular weights. Therefore, the relative position of the peaks must be slightly adjusted to compensate for these differences (see figure below). After this correction, the algorithm identifies peaks and assigns bases.

> ![](https://www.azenta.com/sites/default/files/web-media-library/blog/analyzing-sanger-sequencing-data/fig_09_raw.png)
> 

<!-- REFERENCES -->

[^sanger1977dna]: Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. *Proceedings of the national academy of sciences, 74*(12), 5463-5467. doi: [10.1073/pnas.74.12.5463](https://doi.org/10.1073/pnas.74.12.5463)
[^shendure2008next]: Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. *Nature biotechnology, 26*(10), 1135-1145. doi: [10.1038/nbt1486](https://doi.org/10.1038/nbt1486)

[^shuhaib2023mastering]: Al-Shuhaib, M. B. S., & Hashim, H. O. (2023). Mastering DNA chromatogram analysis in Sanger sequencing for reliable clinical analysis. *J. Genet. Eng. Biotechnol., 21*(1), 115. doi: [10.1186/s43141-023-00587-6](https://doi.org/10.1186/s43141-023-00587-6)
[^lopez2021sanger]: Arteche-López, A., Ávila-Fernández, A., Romero, R., Riveiro-Álvarez, R., López-Martínez, M. A., Giménez-Pardo, A., ... & Ayuso, C. (2021). Sanger sequencing is no longer always necessary based on a single-center validation of 1109 NGS variants in 825 clinical exomes. *Scientific reports, 11*(1), 5697. doi: [10.1038/s41598-021-85182-w](https://doi.org/10.1038/s41598-021-85182-w)
[^cario2020sanger]: De Cario, R., Kura, A., Suraci, S., Magi, A., Volta, A., Marcucci, R., ... & Sticchi, E. (2020). Sanger validation of high-throughput sequencing in genetic diagnosis: Still the best practice?. *Frontiers in genetics, 11*, 592588. doi: [10.3389/fgene.2020.592588](https://doi.org/10.3389/fgene.2020.592588)
[^giani2020long]: Giani, A. M., Gallo, G. R., Gianfranceschi, L., & Formenti, G. (2020). Long walk to genomics: History and current approaches to genome sequencing and assembly. *Computational and Structural Biotechnology Journal*, 18, 9-19. doi: [10.1016/j.csbj.2019.11.002](https://doi.org/10.1016/j.csbj.2019.11.002)
[^crossley2020guidelines]: Crossley, B. M., Bai, J., Glaser, A., Maes, R., Porter, E., Killian, M. L., ... & Toohey-Kurth, K. (2020). Guidelines for Sanger sequencing and molecular assay monitoring. *Journal of Veterinary Diagnostic Investigation, 32*(6), 767-775. doi: [10.1177/1040638720905833](https://doi.org/110.1177/1040638720905833)
