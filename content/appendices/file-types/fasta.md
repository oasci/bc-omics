---
title: FASTA
type: docs
toc: false
---


In FASTA format the line before the nucleotide sequence, called the FASTA definition line, must begin with a carat (`>`), followed by a unique SeqID (sequence identifier).

The SeqID must be unique for each nucleotide sequence and should not contain any spaces. Please limit the SeqID to 25 characters or less. The SeqID can only include letters, digits, hyphens (`-`), underscores (`_`), periods (`.`), colons (`:`), asterisks (`*`), and number signs (`#`).
The sequence identifier will be replaced with an Accession number by the database staff when your submission is processed.

```text
›SeqABCD
```

Information about the source organism from which the sequence was obtained follows the SeqID and must be in the format `[modifier=text]`.
Do not put spaces around the "=". At minimum, the scientific name of the organism should be included. Optional modifiers can be added to provide additional information. A complete list of available source modifiers and their format is available.

```text
›SeqABCD [organism=Mus musculus] [strain=C57BL/6]
```

The final optional component of the FASTA definition line is the sequence title, which will be used as the DEFINITION field in the flatfile. The title should contain a brief description of the sequence. There is a preferred format for nucleotide and protein titles. The provided title will be changed to the proper format by the database staff during processing.

```text
›SeqABCD [organism=Mus musculus] [strain=C57BL/6] Mus musculus neuropilin 1 (Nrp1) mRNA, complete cds.
```

Note in all cases, the FASTA definition line must not contain any hard returns. All information must be on a single line of text. If you have trouble importing your FASTA sequences, please double check that no returns were added to the FASTA definition line by your editing software.

Examples of properly formatted FASTA definition lines for nucleotide sequences:

```text
›Seq1 [organism=Streptomyces lavendulae] [strain=456A] Streptomyces lavendulae strain 456A mitomycin radical oxidase (mcrA) gene, complete cds.
```

```text
›ABCD [organism=Plasmodium falciparum] [isolate=ABCD] Plasmodium falciparum isolate ABCD merozoite surface protein 2 (msp2) gene, partial cds.
```

```text
›DNA.new [organism=Homo sapiens] [chromosome=17] [map=17q21] [moltype=mRNA] Homo sapiens breast and ovarian cancer susceptibility protein (BRCA1) mRNA, complete cds.
```

The line after the FASTA definition line begins the nucleotide sequence.
Unlike the FASTA definition line, the nucleotide sequence itself can contain returns.
It is recommended that each line of sequence be no longer than 80 characters.
Please only use IUPAC symbols within the nucleotide sequence. For sequences that are not contained within an alignment, do not use `?` or `-` characters.
These will be stripped from the sequence.
Use the IUPAC approved symbol `N` for ambiguous characters instead.
