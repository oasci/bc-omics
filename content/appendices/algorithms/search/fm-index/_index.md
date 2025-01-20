---
title: FM-index
type: docs
toc: false
---


!!! warning "Preliminaries"

    We assume you are familiar with the following material:

    -   [Burrows–Wheeler transform](../../compression/bwt/)

In the realm of computer science, the ability to efficiently search through vast amounts of text is a cornerstone of numerous applications, from the intricate analysis of genetic sequences to the retrieval of information in large databases.
The FM-index stands as a pivotal innovation in this domain, offering a sophisticated yet practical solution to the challenge of text searching.
Developed by Paolo Ferragina and Giovanni Manzini in 2000, this data structure has revolutionized the way we approach text indexing and searching by combining compression with search efficiency.

At its core, the FM-index is a compressed full-text substring index.
It facilitates the searching of substrings within a larger text corpus with remarkable efficiency.
The innovation of the FM-index lies not just in its search capabilities but also in its ability to compress the indexed text, thus conserving valuable storage space.

## Last-to-first mapping

BWT is useful for compression since these runs are easier to compress.
The "Last to First" (LF) mapping is a crucial part of the BWT, especially when it comes to the inverse transformation, where it helps in reconstructing the original string from the transformed string.
For example, the BWT of `abracadabra$` is shown below.

&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\$&nbsp;abracadabr&nbsp;a<br>
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**a**&nbsp;\$abracadab&nbsp;r<br>
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**a&nbsp;bra**\$abraca&nbsp;d<br>
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**a&nbsp;bracadabra**&nbsp;\$<br>
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**a&nbsp;cadabra**\$ab&nbsp;r<br>
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**a&nbsp;dabra**\$abra&nbsp;c<br>
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**b&nbsp;ra**\$abracad&nbsp;a<br>
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**b&nbsp;racadabra**\$&nbsp;a<br>
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**c&nbsp;adabra**\$abr&nbsp;a<br>
10&nbsp;&nbsp;&nbsp;**d&nbsp;abra**\$abrac&nbsp;a<br>
11&nbsp;&nbsp;&nbsp;**r&nbsp;a**\$abracada&nbsp;b<br>
12&nbsp;&nbsp;&nbsp;**r&nbsp;acadabra**\$a&nbsp;b<br>

-   **I column:** Shows the index of the sorted rotations of the original string.
-   **F column:** The first column in the sorted list of all rotations of the original string. This column is important because it contains the characters of the original string sorted alphabetically.
-   **L column:** The last column in the sorted list of all rotations of the original string. This is the actual output of the BWT.

The LF mapping is a way to navigate from a character in the last column (L) back to its corresponding character in the first column (F).
This mapping is possible because the sorting step ensures that the cyclic permutations are in a lexicographically sorted order, which preserves the original order of characters that are identical.
Thus, if you know the position of a character in the L column, you can find its original position in the F column.

Given the sorted rotations and the BWT result, we proceed as follows.

**1. Identify the L (last) and F (first) columns from your sorted rotations.**

Based on our BWT above, we have

-   F column (first characters of each row, already sorted): `$aaaaabbcdrr`
-   L column (last characters of each row, the BWT of the string): `ard$rcaaaabb`

**2. Count occurrences in L column up to each character to compute the mapping to F.**

To compute the LF mapping, we need to count how many times each character appears in L up to a given point.
This count tells us the rank of each character in L, which corresponds directly to its original position in F because both columns are essentially different permutations of the same string with the same character frequencies.

First, let's number our F letters starting from zero and increasing by one each time a repeat of a previous letter occurs.
For example, the first a will be a<sub>0</sub>, then the second time an a appears we will label it a<sub>1</sub>, etc.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<br>
**a<sub>0</sub>**&nbsp;\$abracadab&nbsp;r<br>
**a<sub>1</sub>&nbsp;bra**\$abraca&nbsp;d<br>
**a<sub>2</sub>&nbsp;bracadabra**&nbsp;&nbsp;\$<br>
**a<sub>3</sub>&nbsp;cadabra**\$ab&nbsp;r<br>
**a<sub>4</sub>&nbsp;dabra**\$abra&nbsp;c<br>
**b<sub>0</sub>&nbsp;ra**\$abracad&nbsp;a<br>
**b<sub>1</sub>&nbsp;racadabra**\$&nbsp;a<br>
**c<sub>0</sub>&nbsp;adabra**\$abr&nbsp;a<br>
**d<sub>0</sub>&nbsp;abra**\$abrac&nbsp;a<br>
**r<sub>0</sub>&nbsp;a**\$abracada&nbsp;b<br>
**r<sub>1</sub>&nbsp;acadabra**\$a&nbsp;b<br>

Now we will do our L letters.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
**a<sub>0</sub>**&nbsp;\$abracadab&nbsp;r<sub>0</sub><br>
**a<sub>1</sub>&nbsp;bra**\$abraca&nbsp;d<sub>0</sub><br>
**a<sub>2</sub>&nbsp;bracadabra**&nbsp;&nbsp;\$<br>
**a<sub>3</sub>&nbsp;cadabra**\$ab&nbsp;r<sub>1</sub><br>
**a<sub>4</sub>&nbsp;dabra**\$abra&nbsp;c<sub>0</sub><br>
**b<sub>0</sub>&nbsp;ra**\$abracad&nbsp;a<sub>1</sub><br>
**b<sub>1</sub>&nbsp;racadabra**\$&nbsp;a<sub>2</sub><br>
**c<sub>0</sub>&nbsp;adabra**\$abr&nbsp;a<sub>3</sub><br>
**d<sub>0</sub>&nbsp;abra**\$abrac&nbsp;a<sub>4</sub><br>
**r<sub>0</sub>&nbsp;a**\$abracada&nbsp;b<sub>0</sub><br>
**r<sub>1</sub>&nbsp;acadabra**\$a&nbsp;b<sub>1</sub><br>

The number attached to each letter is actually called the rank; the higher the number the higher the rank.
Ranks communicate how many times that letter occurs in the original string.
"a" in our case has the highest rank of 4, which means there are a total of five a's in our string.

!!! note

    In the context of the BWT, the rank of a character within the L column does not simply indicate how many times the character appears, but rather its sequential position among identical characters within that column. This is a crucial point because the BWT, by design, groups similar characters together due to the sorting of all cyclic permutations of the original string. The rank tells us not just about the quantity of occurrences but about the order of each occurrence within the transformed string.

The power of this rank is that the F letter with the same rank as a L letter is the same letter from the original string.
Don't believe me?
Look at the r<sub>0</sub> in the L column; if we wrap around and continue the cyclical permutation until we hit \$ we see that it would be r<sub>0</sub>a\$.
Now, find r<sub>0</sub> in the F column and continue until we hit \$.
We also get r<sub>0</sub>a\$!
Go ahead and try this for other letters&mdash;it will work every time.

How?
Well, this specifically has to do with the fact we add the `$` to the end of our string and made sure it is lexicographically lower than any possible letter.
The right-context of a character is essentially the substring that follows it in a particular cyclic permutation of the original string.
Since the BWT sorts these permutations lexicographically, characters are effectively grouped by their right-context in the L column.
When we map a character from L back to F using its rank, we're leveraging the inherent organization of the BWT, where each character's position is intimately tied to its right-context.
This mapping allows us to trace each character's journey through the sorted permutations, from its position in the L column (where it ends a particular permutation) back to its position in the F column (where it starts another, lexicographically earlier, permutation).

## Reversing the BWT

You can also use the LF mapping to reverse the BWT and get the original string.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; L<br>
\$&nbsp;&nbsp;&nbsp;&nbsp; a<sub>0</sub><br>
a<sub>0</sub>&nbsp;&nbsp; r<sub>0</sub><br>
a<sub>1</sub>&nbsp;&nbsp; d<sub>0</sub><br>
a<sub>2</sub>&nbsp;&nbsp; \$<br>
a<sub>3</sub>&nbsp;&nbsp; r<sub>1</sub><br>
a<sub>4</sub>&nbsp;&nbsp; c<sub>0</sub><br>
b<sub>0</sub>&nbsp;&nbsp; a<sub>1</sub><br>
b<sub>1</sub>&nbsp;&nbsp; a<sub>2</sub><br>
c<sub>0</sub>&nbsp;&nbsp; a<sub>3</sub><br>
d<sub>0</sub>&nbsp;&nbsp; a<sub>4</sub><br>
r<sub>0</sub>&nbsp;&nbsp;&nbsp; b<sub>0</sub><br>
r<sub>1</sub>&nbsp;&nbsp;&nbsp; b<sub>1</sub><br>

You start from the first row with \$ and then move to the end and append the letter.

**Original:** \$a<sub>0</sub>

Move to the row that starts with a<sub>0</sub> and then add the L-column letter.

**Original:** \$a<sub>0</sub>r<sub>0</sub>

Move to the row that starts with r<sub>0</sub> and then add the L-column letter.

**Original:** \$a<sub>0</sub>r<sub>0</sub>b<sub>0</sub>

Repeat this process until you reach \$ in the L column.

**Original:** \$a<sub>0</sub>r<sub>0</sub>b<sub>0</sub>a<sub>1</sub>d<sub>0</sub>
a<sub>4</sub>c<sub>0</sub>a<sub>3</sub>r<sub>1</sub>b<sub>1</sub>a<sub>2</sub>

Now, reverse this string

**Reversed:** a<sub>2</sub>b<sub>1</sub>r<sub>1</sub>a<sub>3</sub>c<sub>0</sub>a<sub>4</sub>d<sub>0</sub>a<sub>1</sub>b<sub>0</sub>r<sub>0</sub>a<sub>0</sub>\$

and drop the ranks.

**Reversed:** abracadabra\$

## Searching

This LF mapping is also super helpful in quickly searching for patterns.
For example, let's search our BWT for the string "bra" and copy our BWT below.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
a<sub>0</sub>&nbsp;\$abracadab&nbsp;r<sub>0</sub><br>
a<sub>1</sub>&nbsp;bra\$abraca&nbsp;d<sub>0</sub><br>
a<sub>2</sub>&nbsp;bracadabra&nbsp;&nbsp;\$<br>
a<sub>3</sub>&nbsp;cadabra\$ab&nbsp;r<sub>1</sub><br>
a<sub>4</sub>&nbsp;dabra\$abra&nbsp;c<sub>0</sub><br>
b<sub>0</sub>&nbsp;ra\$abracad&nbsp;a<sub>1</sub><br>
b<sub>1</sub>&nbsp;racadabra\$&nbsp;a<sub>2</sub><br>
c<sub>0</sub>&nbsp;adabra\$abr&nbsp;a<sub>3</sub><br>
d<sub>0</sub>&nbsp;abra\$abrac&nbsp;a<sub>4</sub><br>
r<sub>0</sub>&nbsp;a\$abracada&nbsp;b<sub>0</sub><br>
r<sub>1</sub>&nbsp;acadabra\$a&nbsp;b<sub>1</sub><br>

Similar to our reversing the BWT, we perform successive LF mapping but we first reverse our search string (i.e., arb).

!!! note

    We actually did this in the previous section by starting from the first row that begins with \$.

First, we find all rows that start with "a".

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
**a<sub>0</sub>&nbsp;\$abracadab&nbsp;r<sub>0</sub>**<br>
**a<sub>1</sub>&nbsp;bra\$abraca&nbsp;d<sub>0</sub>**<br>
**a<sub>2</sub>&nbsp;bracadabra&nbsp;&nbsp;\$**<br>
**a<sub>3</sub>&nbsp;cadabra\$ab&nbsp;r<sub>1</sub>**<br>
**a<sub>4</sub>&nbsp;dabra\$abra&nbsp;c<sub>0</sub>**<br>
b<sub>0</sub>&nbsp;ra\$abracad&nbsp;a<sub>1</sub><br>
b<sub>1</sub>&nbsp;racadabra\$&nbsp;a<sub>2</sub><br>
c<sub>0</sub>&nbsp;adabra\$abr&nbsp;a<sub>3</sub><br>
d<sub>0</sub>&nbsp;abra\$abrac&nbsp;a<sub>4</sub><br>
r<sub>0</sub>&nbsp;a\$abracada&nbsp;b<sub>0</sub><br>
r<sub>1</sub>&nbsp;acadabra\$a&nbsp;b<sub>1</sub><br>

Now we eliminate all rows that do not end in "r" because remember the letter in F is the letter immediately preceding the L letter in the same row.
Thus, any row with "a" in F and "r" in L represents "ra" in the original string.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
**a<sub>0</sub>&nbsp;\$abracadab&nbsp;r<sub>0</sub>**<br>
a<sub>1</sub>&nbsp;bra\$abraca&nbsp;d<sub>0</sub><br>
a<sub>2</sub>&nbsp;bracadabra&nbsp;&nbsp;\$<br>
**a<sub>3</sub>&nbsp;cadabra\$ab&nbsp;r<sub>1</sub>**<br>
a<sub>4</sub>&nbsp;dabra\$abra&nbsp;c<sub>0</sub><br>
b<sub>0</sub>&nbsp;ra\$abracad&nbsp;a<sub>1</sub><br>
b<sub>1</sub>&nbsp;racadabra\$&nbsp;a<sub>2</sub><br>
c<sub>0</sub>&nbsp;adabra\$abr&nbsp;a<sub>3</sub><br>
d<sub>0</sub>&nbsp;abra\$abrac&nbsp;a<sub>4</sub><br>
r<sub>0</sub>&nbsp;a\$abracada&nbsp;b<sub>0</sub><br>
r<sub>1</sub>&nbsp;acadabra\$a&nbsp;b<sub>1</sub><br>

Now we find the rows with r<sub>0</sub> and r<sub>1</sub> in the F column.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
a<sub>0</sub>&nbsp;\$abracadab&nbsp;r<sub>0</sub><br>
a<sub>1</sub>&nbsp;bra\$abraca&nbsp;d<sub>0</sub><br>
a<sub>2</sub>&nbsp;bracadabra&nbsp;&nbsp;\$<br>
a<sub>3</sub>&nbsp;cadabra\$ab&nbsp;r<sub>1</sub><br>
a<sub>4</sub>&nbsp;dabra\$abra&nbsp;c<sub>0</sub><br>
b<sub>0</sub>&nbsp;ra\$abracad&nbsp;a<sub>1</sub><br>
b<sub>1</sub>&nbsp;racadabra\$&nbsp;a<sub>2</sub><br>
c<sub>0</sub>&nbsp;adabra\$abr&nbsp;a<sub>3</sub><br>
d<sub>0</sub>&nbsp;abra\$abrac&nbsp;a<sub>4</sub><br>
**r<sub>0</sub>&nbsp;a\$abracada&nbsp;b<sub>0</sub><br>**
**r<sub>1</sub>&nbsp;acadabra\$a&nbsp;b<sub>1</sub><br>**

We normally will need to eliminate all rows that do not have "b" in the L column, but we don't need to in this example.
We go to the L column of our valid rows and see that our matches start with b<sub>0</sub> and b<sub>1</sub> in the F column.

F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L<br>
&nbsp;\$&nbsp;&nbsp;abracadabr&nbsp;a<sub>0</sub><br>
a<sub>0</sub>&nbsp;\$abracadab&nbsp;r<sub>0</sub><br>
a<sub>1</sub>&nbsp;bra\$abraca&nbsp;d<sub>0</sub><br>
a<sub>2</sub>&nbsp;bracadabra&nbsp;&nbsp;\$<br>
a<sub>3</sub>&nbsp;cadabra\$ab&nbsp;r<sub>1</sub><br>
a<sub>4</sub>&nbsp;dabra\$abra&nbsp;c<sub>0</sub><br>
**b<sub>0</sub>&nbsp;ra\$abracad&nbsp;a<sub>1</sub><br>**
**b<sub>1</sub>&nbsp;racadabra\$&nbsp;a<sub>2</sub><br>**
c<sub>0</sub>&nbsp;adabra\$abr&nbsp;a<sub>3</sub><br>
d<sub>0</sub>&nbsp;abra\$abrac&nbsp;a<sub>4</sub><br>
r<sub>0</sub>&nbsp;a\$abracada&nbsp;b<sub>0</sub><br>
r<sub>1</sub>&nbsp;acadabra\$a&nbsp;b<sub>1</sub><br>

We have found the two rows that match our string.
This may seem redundant since we can easily see the correct rows from the beginning, but this quickly becomes intractable when we have thousands and thousands of rows.

## Rank array

TODO: Introduce rank arrays for L and F and explain navigating them.

## Checkpoints

TODO: Introduce rank checkpoints and offsets

<!-- REFERENCES -->

[^cheng2018fmtree]: Cheng, H., Wu, M., & Xu, Y. (2018). FMtree: a fast locating algorithm of FM-indexes for genomic data. *Bioinformatics, 34*(3), 416-424. doi: [10.1093/bioinformatics/btx596](https://doi.org/10.1093/bioinformatics/btx596)
[^wikipedia]: [FM-index Wikipedia](https://en.wikipedia.org/wiki/FM-index)
[^curious-coding]: [Interactive demo from Curious Coding](https://curiouscoding.nl/notes/bwt/)
[^alex-bowe]: [Blog post from Alex Bowe](https://www.alexbowe.com/fm-index/)
[^bwt-fmindex-langmead]: [Slides from Ben Langmead](https://www.cs.jhu.edu/~langmea/resources/lecture_notes/bwt_and_fm_index.pdf)
[^simpson2010efficient]: Simpson, J. T., & Durbin, R. (2010). Efficient construction of an assembly string graph using the FM-index. *Bioinformatics, 26*(12), i367-i373. doi: [10.1093/bioinformatics/btq217](https://doi.org/10.1093/bioinformatics/btq217)
