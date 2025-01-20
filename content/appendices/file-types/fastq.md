---
title: FASTQ
type: docs
toc: false
---


Results of sanger sequencing are usually `fasta` files obtained from processing chromatograms.
Most high-throughput sequencing (HTS) machines output `fastq` files, the “de facto” current standard in HTS.
Like `fasta`, `fastq` files are simply text files, but where each block of information in this format is encoded as 4 lines:

```text
@read_identifier
read_sequence
+ separator line
base_qualities
```

For example, here you have 8 lines of a fastq file, corresponding to 2 sequences:

```text
@HWI-M01876:76:000000000-AF16W:1:1101:10853:1000 1:N:0:CGTGACAGAT
NTGTACTTCATCCGAAACTCGTGCTCATCTCTGCTCAGATCGGAAGAGCACACGTCTGAACTCCAGTCACCGTGAT
+
#8ABCFGGGFCEDCFGGGGGGGFFCGEFGGGGGGFGGGGGGGGDEFGGGGGGGGGGGGGGGGGFFFEGGGGGGGGF
@HWI-M01876:76:000000000-AF16W:1:1101:16471:1000 1:N:0:CGTGAACTTG
NTTCCAGATATTCGATGCATGTGCCGCTCCTGTCGGAGATCGGAAGAGCACACGTCTGAACTCCAGTCACCGTGAT
+
#8BCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGEGGGGFGGGGGGGGGGGGGGGGGGGGGGGGGG
```

## Q is for Quality

Each base has a quality character associated with it, representing how confidently the machine identified (called) the base.
The probability of error per base is given as a Phred score, $Q$, calculated from an integer value derived from the quality character associated to the base.
This error probability, $P$ is computed with

$$
P = 10^{-Q/10}.
$$

Useful reference values of Q include:

-   $Q = 10$ represents 90% accuracy (0.1 error)
-   $Q = 20$ represents 99% accuracy (0.01 error)
-   $Q = 30$ represents 99.9% accuracy (0.001 error)
-   $Q = 40$ represents 99.99% accuracy (0.0001 error)
-   $Q = 50$ represents 99.999% accuracy (0.00001 error)

Although there’s theoretically no limit, $Q$ usually goes up to around 40 in recent illumina machines.

### ASCII table

To obtain this $Q$ value from the character associated to the quality of the base, we have to know that each character (such as `#`) has an ASCII decimal value associated.
For example, `#` has a value of 35.

```text
Dec  Char                           Dec  Char     Dec  Char     Dec  Char
---------                           ---------     ---------     ----------
  0  NUL (null)                      32  SPACE     64  @         96  `
  1  SOH (start of heading)          33  !         65  A         97  a
  2  STX (start of text)             34  "         66  B         98  b
  3  ETX (end of text)               35  #         67  C         99  c
  4  EOT (end of transmission)       36  $         68  D        100  d
  5  ENQ (enquiry)                   37  %         69  E        101  e
  6  ACK (acknowledge)               38  &         70  F        102  f
  7  BEL (bell)                      39  '         71  G        103  g
  8  BS  (backspace)                 40  (         72  H        104  h
  9  TAB (horizontal tab)            41  )         73  I        105  i
 10  LF  (NL line feed, new line)    42  *         74  J        106  j
 11  VT  (vertical tab)              43  +         75  K        107  k
 12  FF  (NP form feed, new page)    44  ,         76  L        108  l
 13  CR  (carriage return)           45  -         77  M        109  m
 14  SO  (shift out)                 46  .         78  N        110  n
 15  SI  (shift in)                  47  /         79  O        111  o
 16  DLE (data link escape)          48  0         80  P        112  p
 17  DC1 (device control 1)          49  1         81  Q        113  q
 18  DC2 (device control 2)          50  2         82  R        114  r
 19  DC3 (device control 3)          51  3         83  S        115  s
 20  DC4 (device control 4)          52  4         84  T        116  t
 21  NAK (negative acknowledge)      53  5         85  U        117  u
 22  SYN (synchronous idle)          54  6         86  V        118  v
 23  ETB (end of trans. block)       55  7         87  W        119  w
 24  CAN (cancel)                    56  8         88  X        120  x
 25  EM  (end of medium)             57  9         89  Y        121  y
 26  SUB (substitute)                58  :         90  Z        122  z
 27  ESC (escape)                    59  ;         91  [        123  {
 28  FS  (file separator)            60  <         92  \        124  |
 29  GS  (group separator)           61  =         93  ]        125  }
 30  RS  (record separator)          62  >         94  ^        126  ~
 31  US  (unit separator)            63  ?         95  _        127  DEL
```

The $Q$ value of a character is the decimal value corresponding to the entry of that character in the ASCII table, subtracted by 33.
For example $Q$(`#`) = 35 – 33 = 2.

!!! important "Why do we subtract by 33?"

    All ASCII decimal values lower than 33 are not visible characters.
    For example, the `NUL` character is not really visible in a text file; same with `CAN` for cancel.
    `!` has the lowest ASCII decimal value that is usable in a text file.

## Computing error

Looking at the first read of our fastq example,

```text
@HWI-M01876:76:000000000-AF16W:1:1101:10853:1000 1:N:0:CGTGACAGAT
NTGTACTTCATCCGAAACTCGTGCTCATCTCTGCTCAGATCGGAAGAGCACACGTCTGAACTCCAGTCACCGTGAT
+
#8ABCFGGGFCEDCFGGGGGGGFFCGEFGGGGGGFGGGGGGGGDEFGGGGGGGGGGGGGGGGGFFFEGGGGGGGGF
@HWI-M01876:76:000000000-AF16W:1:1101:16471:1000 1:N:0:CGTGAACTTG
NTTCCAGATATTCGATGCATGTGCCGCTCCTGTCGGAGATCGGAAGAGCACACGTCTGAACTCCAGTCACCGTGAT
+
#8BCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGEGGGGFGGGGGGGGGGGGGGGGGGGGGGGGGG
```

we can see it starts with `N` (unknown), with an associated quality character `#`.
To know how confident the machine was in reading that base, we calculate:

-   $Q$ = 35 (ASCII decimal value of `#`) - 33 (ASCII decimal value of `!`) = 2
-   $P = 10^{-2/10}$ = 0.631 (63.1% probability of error)

Given this probability of error, it is not surprising that the machine could not confidently say which base was in that position and therefore placed an `N` in that position.
It is fairly common that in the first bases the machine is still calibrating, and sometimes there is less confidence in the called base.

Many sequencing machines can read both ends of a fragment.
In this case, the machine will generate two paired `fastq` files, one with the forward reads and another with the reverse reads.
You can find an example of this is the example fastq files `paired_end_example_1` (containing the forward reads) and `paired_end_example_2` (containing the reverse reads).
These fastq are paired because the reads for the same fragment are in the same order in the two files.
For example, the first read in the forward fastq corresponds to the forward reading of the same fragment as the first read in the reverse fastq.

## Acknowledgements

Parts of this material were adapted with permission from the following sources:

-   [Entry Level Bioinformatics](https://gtpb.github.io/ELB18S/)
