<h1 align="center">Omics</h1>

<p align="center">
    <a href="https://github.com/oasci/bc-omics/actions">
        <img src="https://github.com/oasci/bc-omics/actions/workflows/pages.yaml/badge.svg" alt="Build Status ">
    </a>
    <a href="https://creativecommons.org/licenses/by/4.0/">
        <img src="https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg" alt="License">
    </a>
</p>

A template for breadcrumb sites.

## Local Development

Pre-requisites: [Hugo](https://gohugo.io/getting-started/installing/), [Go](https://golang.org/doc/install) and [Git](https://git-scm.com)

```shell
# Clone the repo
git clone git@github.com:oasci/bc-omics.git

# Change directory
cd bc-omics

# Install modules
hugo mod tidy

# Start the server
hugo server --logLevel debug --disableFastRender -p 1313
```

### Update theme

```shell
hugo mod get -u
hugo mod tidy
```

See [Update modules](https://gohugo.io/hugo-modules/use-modules/#update-modules) for more details.
