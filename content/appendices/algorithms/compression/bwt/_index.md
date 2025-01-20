---
title: Burrows–Wheeler transform
type: docs
toc: false
---


The Burrows-Wheeler Transform (BWT) is a revolutionary algorithm in the field of data transformation and compression.
Developed by Michael Burrows and David Wheeler in 1994, this algorithm reorganizes a string of characters in such a way that similar characters are grouped together, forming runs of the same character.
This unique characteristic makes the BWT an invaluable tool in data compression, as it enhances the efficiency of subsequent compression algorithms by making the data more uniform and, thus, easier to compress.

## Applications

The primary application of the BWT is in data compression.
By transforming data into runs of similar characters, the BWT prepares the data for more efficient compression by other algorithms.
It's often used as a pre-processing step in compression algorithms to increase their effectiveness.
The transformation makes the data more uniform, which in turn makes it easier for compression algorithms to reduce the size of the data without losing any information.

In the realm of bioinformatics, the BWT has found significant applications, particularly in sequence alignment and genome assembly.
The ability of the BWT to organize similar characters (or nucleotides, in the case of DNA/RNA) together makes it an excellent tool for identifying regions of similarity within long sequences of genomic data.
This capability is crucial for aligning sequences to reference genomes, identifying genetic variations, and assembling short DNA sequences into longer ones.

## Methodology

### Rotation

The first step in the BWT is to construct a matrix that includes all possible rotations of the input string.
To do this, we take the input string and rotate it one character at a time, prepending each rotation to a matrix.

??? note "Code"

    ```python
    def create_rotations(input_string):
        rotations = []
        length = len(input_string)
        # Concatenate the string with itself to simplify rotation
        temp_string = input_string + input_string
        # Generate all rotations
        for i in range(length):
            rotations.prepend(temp_string[i:i+length])
        return rotations
    ```

Here is an example for each stage of processing the input `banana$` using the Burrows-Wheeler Transform (BWT).

!!! note

    It's common to prepend a special character (like `$`) to the end of the input string to signify the end of the string.
    This character should be unique and lexicographically smaller than any other character in the string to ensure it sorts properly.

The matrix consisting of all possible rotations of the input string `banana$`.
We have **bolded** all of the suffixes in the BWT.

**banana**\$<br>
**anana**\$b<br>
**nana**\$ba<br>
**ana**\$ban<br>
**na**\$bana<br>
**a**\$banan<br>
\$banana<br>

Each cyclical permutation shifts the characters of the string, effectively moving the last character to the front and sliding the rest one position to the right.
This process preserves the "neighborhood" of characters, meaning that characters adjacent before the permutation remain close to each other in the permutations.

### Sorting

After creating the matrix of all possible rotations, the next step is to sort these rotations lexicographically (i.e., in dictionary order).
This step reorganizes the matrix into a more structured form that is essential for the next step of the transform.

??? note "Code"

    ```python
    def sort_rotations(rotations):
        return sorted(rotations)
    ```

The sorted rotations of the input string, lexicographically:

\$banana<br>
**a**\$banan<br>
**ana**\$ban<br>
**anana**\$b<br>
**banana**\$<br>
**na**\$bana<br>
**nana**\$ba<br>

When these cyclical permutations are sorted lexicographically, patterns emerge.
Characters frequently occurring in the original text tend to group in the matrix of sorted permutations.
This grouping is especially pronounced for repeated patterns or sequences in the text, making them more apparent and compressible.
For example, we see **an** and **na** patterns are present and sorted near each other.

### Extraction

The final step in the Burrows-Wheeler Transform is to extract the last column of the sorted matrix.
This column contains the transformed string, which tends to have runs of similar characters, making it more amenable to compression.

??? note "Code"

    ```python
    def extract_last_column(sorted_rotations):
        last_column = ''.join(rotation[-1] for rotation in sorted_rotations)
        return last_column
    ```

The last column of this sorted matrix, which is the transformed string: **`annb$aa`**

## Inversion

Inversion of the BWT is a crucial feature that distinguishes it from other data transformation techniques.
It allows for the original document to be regenerated from its BWT representation, which is essentially the last column of a sorted list of all cyclic rotations of the document.
This process is reversible due to the unique properties of the BWT and does not require the original document or any additional information beyond the BWT output and the position of the original string in the sorted list.

### Start with the Last Column

Given the last column from the BWT output, the first task is to reconstruct the first column of the sorted rotations matrix. Since the last column contains all the characters of the original string, sorting these characters gives us the first column.
The sorting needs to account for multiple occurrences of the same character by ensuring their relative order is preserved as in the last column.

<div class="grid cards" markdown>

-   **(1) Last column**

    ---

    `a`<br>`n`<br>`n`<br>`b`<br>`$`<br>`a`<br>`a`<br>

</div>

### Reconstruct the First Column

Sort the characters in the last column alphabetically to obtain the first column of the matrix.
This is possible because both columns contain the same set of characters, and sorting the last column's characters gives you the original order of characters as they appeared before the rotations were sorted.

<div class="grid cards" markdown>

-   **(1) Last column**&mdash;BWT output

    ---

    `a`<br>`n`<br>`n`<br>`b`<br>`$`<br>`a`<br>`a`<br>

-   **(2) Last column sorted**&mdash;first column

    ---

    `$`<br>`a`<br>`a`<br>`a`<br>`b`<br>`n`<br>`n`<br>

</div>

### Pair Successive Characters

The next step involves pairing each character in the last column with the character in the same row of the first column.
These pairs represent successive characters in the document, taking cyclically so that the last and first character form a pair. This cyclical pairing is a key aspect of the BWT's ability to preserve character sequences from the original document.

<div class="grid cards" markdown>

-   **(2)**

    ---

    `$`<br>`a`<br>`a`<br>`a`<br>`b`<br>`n`<br>`n`<br>

-   **(3) Pair BWT output to the front**

    ---

    `a$`<br>`na`<br>`na`<br>`ba`<br>`$b`<br>`an`<br>`an`<br>

</div>

### Sort and Reconstruct Columns

By sorting these pairs, you start to reconstruct the document one column at a time.
Each iteration adds another character to the reconstructed sequence, progressively building up the sorted rotations matrix.
This iterative sorting and pairing process continues until the entire document is reconstructed.

<div class="grid cards" markdown>

-   **(3)**

    ---

    `a$`<br>`na`<br>`na`<br>`ba`<br>`$b`<br>`an`<br>`an`<br>

-   **(4) Sort**

    ---

    `$b`<br>`a$`<br>`an`<br>`an`<br>`ba`<br>`na`<br>`na`<br>

</div>

<div class="grid cards" markdown>

-   **(5) prepend**

    ---

    `a$b`<br>`na$`<br>`nan`<br>`ban`<br>`$ba`<br>`ana`<br>`ana`<br>

-   **(6) Sort**

    ---

    `$ba`<br>`a$b`<br>`ana`<br>`ana`<br>`ban`<br>`na$`<br>`nan`<br>

</div>

<div class="grid cards" markdown>

-   **(7) prepend**

    ---

    `a$ba`<br>`na$b`<br>`nana`<br>`bana`<br>`$ban`<br>`ana$`<br>`anan`<br>

-   **(8) Sort**

    ---

    `$ban`<br>`a$ba`<br>`ana$`<br>`anan`<br>`bana`<br>`na$b`<br>`nana`<br>

</div>

<div class="grid cards" markdown>

-   **(9) prepend**

    ---

    `a$ban`<br>`na$ba`<br>`nana$`<br>`banan`<br>`$bana`<br>`ana$b`<br>`anana`<br>

-   **(10) Sort**

    ---

    `$bana`<br>`a$ban`<br>`ana$b`<br>`anana`<br>`banan`<br>`na$ba`<br>`nana$`<br>

</div>

<div class="grid cards" markdown>

-   **(11) prepend**

    ---

    `a$bana`<br>`na$ban`<br>`nana$b`<br>`banana`<br>`$banan`<br>`ana$ba`<br>`anana$`<br>

-   **(12) Sort**

    ---

    `$banan`<br>`a$bana`<br>`ana$ba`<br>`anana$`<br>`banana`<br>`na$ban`<br>`nana$b`<br>

</div>

<div class="grid cards" markdown>

-   **(13) prepend**

    ---

    `a$banan`<br>`na$bana`<br>`nana$ba`<br>`banana$`<br>`$banana`<br>`ana$ban`<br>`anana$b`<br>

</div>

### Identify the Original Text

The row that ends with the special "end of file" character (e.g., `$` in our case) indicates the original document: **`banana$`**.

??? note "Code"

    ```python
    def invert_burrows_wheeler(last_column):
        # Initialize a list to hold tuples of (character, index) for sorting
        char_tuples = [(char, i) for i, char in enumerate(last_column)]

        # Sort the tuples by character to simulate the first column
        first_column_tuples = sorted(char_tuples)

        # Reconstruct the document using a table of indices
        text_length = len(last_column)
        # Initialize the index for the row that starts with the EOF character (assuming it's at the end)
        current_index = last_column.index('$')
        original_text = [''] * text_length

        for i in range(text_length):
            char, next_index = first_column_tuples[current_index]
            original_text[i] = char
            current_index = next_index

        # Return the reconstructed text as a string
        return ''.join(original_text)
    ```

<!-- REFERENCES -->

[^bwt-fmindex-langmead]: [Slides from Ben Langmead](https://www.cs.jhu.edu/~langmea/resources/lecture_notes/bwt_and_fm_index.pdf)
[^bwt-report]: [A Block-sorting Lossless Data Compression Algorithm](https://www.hpl.hp.com/techreports/Compaq-DEC/SRC-RR-124.pdf)
