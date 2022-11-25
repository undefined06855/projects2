const reponame =
`
<div id="repo_[[ID]]" onclick="openDetailedRepoView([[ID]])" tabindex="0">
    <h3>[[TITLE]]</h3>
    <h6>[[DESC]]</h6>
</div>
`

const style =
`
#repo_[[ID]] {
    rotate: [[RAND]]deg;
    background-color: rgb(202, 202, 202)
}

#repo_[[ID]]:hover, .repo_[[ID]]:focus {
    rotate: [[RAND2]]deg !important;
    z-index: 100;
}

@media (prefers-reduced-motion) {
    #repo_[[ID]] {
        rotate: 0deg;
        background-color: rgb(202, 202, 202)
    }
    
    #repo_[[ID]]:hover, #repo_[[ID]]:focus {
        rotate: [[RAND]]deg !important;
        z-index: 100;
    }
}
`
