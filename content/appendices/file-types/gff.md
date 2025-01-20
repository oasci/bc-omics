---
title: Generic Feature Format (GFF)
type: docs
toc: false
---


GFF is a standard file format for storing genomic features in a text file.

## Examples

```text
##gff-version 3
ctg123  .  exon  1300  1500  .  +  .  ID=exon00001
ctg123  .  exon  1050  1500  .  +  .  ID=exon00002
ctg123  .  exon  3000  3902  .  +  .  ID=exon00003
ctg123  .  exon  5000  5500  .  +  .  ID=exon00004
ctg123  .  exon  7000  9000  .  +  .  ID=exon00005
```

```text
##gff-version 3
#!gff-spec-version 1.21
#!processor NCBI annotwriter
#!genome-build PDT000047663.3
#!genome-build-accession NCBI_Assembly:GCA_012827885.1
#!annotation-date 02/29/2020 20:52:21
#!annotation-source NCBI
##sequence-region AATIZC010000001.1 1 652455
##species https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=562
AATIZC010000001.1	Genbank	region	1	652455	.	+	.	ID=AATIZC010000001.1:1..652455;Dbxref=taxon:562;collected-by=CDC;country=USA;gbkey=Src;isolation-source=stool;mol_type=genomic DNA;serovar=E. coli O157:H7;strain=2014C-4644
AATIZC010000001.1	Genbank	gene	138	713	.	-	.	ID=gene-SR44_000001;Name=gmhB;gbkey=Gene;gene=gmhB;gene_biotype=protein_coding;locus_tag=SR44_000001
AATIZC010000001.1	Protein Homology	CDS	138	713	.	-	0	ID=cds-EFL8326616.1;Parent=gene-SR44_000001;Dbxref=NCBI_GP:EFL8326616.1;Name=EFL8326616.1;gbkey=CDS;gene=gmhB;inference=COORDINATES: similar to AA sequence:RefSeq:NP_308229.1;locus_tag=SR44_000001;product=D-glycero-beta-D-manno-heptose 1%2C7-bisphosphate 7-phosphatase;protein_id=EFL8326616.1;transl_table=11
AATIZC010000001.1	Genbank	gene	901	1932	.	+	.	ID=gene-SR44_000002;Name=metN;gbkey=Gene;gene=metN;gene_biotype=protein_coding;locus_tag=SR44_000002
```

## Format

The GFF contains the following columns.

### "seqid"

The ID of the landmark used to establish the coordinate system for the current feature. IDs may contain any characters, but must escape any characters not in the set [a-zA-Z0-9.:^*$@!+_?-|].
In particular, IDs may not contain unescaped whitespace and must not begin with an unescaped ">".

To escape a character in this, or any of the other GFF3 fields, replace it with the percent sign followed by its hexadecimal representation.
For example, ">" becomes "%E3". See URL Encoding (or: 'What are those "%20" codes in URLs?') for details.

### "source"

The source is a free text qualifier intended to describe the algorithm or operating procedure that generated this feature.
Typically this is the name of a piece of software, such as "Genescan" or a database name, such as "Genbank."
In effect, the source is used to extend the feature ontology by adding a qualifier to the type creating a new composite type that is a subclass of the type in the type column.
It is not necessary to specify a source.
If there is no source, put a "." (a period) in this field.

### "type"

The type of the feature (previously called the "method").
This is constrained to be either: (a) a term from the "lite" sequence ontology, SOFA; or (b) a SOFA accession number.
The latter alternative is distinguished using the syntax SO:000000.
This field is required.

### "start" and "end"

The start and end of the feature, in 1-based integer coordinates, relative to the landmark given in column 1.
Start is always less than or equal to end.

For zero-length features, such as insertion sites, start equals end and the implied site is to the right of the indicated base in the direction of the landmark.
These fields are required.

### "score"

The score of the feature, a floating point number.
As in earlier versions of the format, the semantics of the score are ill-defined.
It is strongly recommended that E-values be used for sequence similarity features, and that P-values be used for ab initio gene prediction features.
If there is no score, put a "." (a period) in this field.

### "strand"

The strand of the feature. + for positive strand (relative to the landmark), - for minus strand, and . for features that are not stranded.
In addition, ? can be used for features whose strandedness is relevant, but unknown.

### "phase"

For features of type "CDS", the phase indicates where the feature begins with reference to the reading frame.
The phase is one of the integers 0, 1, or 2, indicating the number of bases that should be removed from the beginning of this feature to reach the first base of the next codon.
In other words, a phase of "0" indicates that the next codon begins at the first base of the region described by the current line, a phase of "1" indicates that the next codon begins at the second base of this region, and a phase of "2" indicates that the codon begins at the third base of this region.
This is NOT to be confused with the frame, which is simply start modulo 3.
If there is no phase, put a "." (a period) in this field.

For forward strand features, phase is counted from the start field.
For reverse strand features, phase is counted from the end field.

The phase is required for all CDS features.

### "attributes"

A list of feature attributes in the format tag=value.
Multiple tag=value pairs are separated by semicolons.
URL escaping rules are used for tags or values containing the following characters: ",=;".
Spaces are allowed in this field, but tabs must be replaced with the %09 URL escape. This field is not required.

Column 9 tags have predefined meanings.

#### ID

Indicates the unique identifier of the feature.
IDs must be unique within the scope of the GFF file.

#### Name

Display name for the feature. This is the name to be displayed to the user. Unlike IDs, there is no requirement that the Name be unique within the file.

#### Alias

A secondary name for the feature. It is suggested that this tag be used whenever a secondary identifier for the feature is needed, such as locus names and accession numbers. Unlike ID, there is no requirement that Alias be unique within the file.

#### Parent

Indicates the parent of the feature. A parent ID can be used to group exons into transcripts, transcripts into genes, and so forth. A feature may have multiple parents. Parent can *only* be used to indicate a partof relationship.

#### Target

Indicates the target of a nucleotide-to-nucleotide or protein-to-nucleotide alignment. The format of the value is "target_id start end [strand]", where strand is optional and may be "+" or "-". If the target_id contains spaces, they must be escaped as hex escape %20.

#### Gap

The alignment of the feature to the target if the two are not collinear (e.g. contain gaps).
The alignment format is taken from the CIGAR format described in the Exonerate documentation.
http://cvsweb.sanger.ac.uk/cgi-bin/cvsweb.cgi/exonerate?cvsroot=Ensembl.
See the GFF3 specification for more information.

#### Derives_from

Used to disambiguate the relationship between one feature and another when the relationship is a temporal one rather than a purely structural "part of" one. This is needed for polycistronic genes. See the GFF3 specification for more information.

#### Note

A free text note.

#### Dbxref

A database cross reference. See the GFF3 specification for more information.

#### Ontology_term

A cross reference to an ontology term. See the GFF3 specification for more information.

Multiple attributes of the same type are indicated by separating the values with the comma "," character, as in:

```text
Parent=AF2312,AB2812,abc-3
```

Note that attribute names are case sensitive.
"Parent" is not the same as "parent".

All attributes that begin with an uppercase letter are reserved for later use.
Attributes that begin with a lowercase letter can be used freely by applications.
You can stash any semi-structured data into the database by using one or more unreserved (lowercase) tags.

## Acknowledgements

Some of this material has been adapted with permission from the following sources.

-   [Formal GFF3 specification](https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md)
-   [GMOD wiki](http://gmod.org/wiki/GFF3)
