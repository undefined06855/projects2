const req = new XMLHttpRequest()
var json = {}
  , jsons = []

// #region relativetime
// https://stackoverflow.com/a/53800501
var units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

var getRelativeTime = date => {
    var elapsed = date - new Date()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) 
        if (Math.abs(elapsed) > units[u] || u == 'second') 
            return rtf.format(Math.round(elapsed/units[u]), u)
}
// #endregion
// #region detailedview
function openDetailedRepoView(id)
{
    repo = jsons[id]

    document.getElementById("overlay").style.display = "block"

    requestAnimationFrame(() => {
        document.getElementById("reponame").innerText = repo.name
        document.getElementById("repodesc").innerText = repo.description === null ? "(No description provided)" : repo.description
        document.getElementById("repotime").innerText = 
        "Last updated " + getRelativeTime(new Date(repo.pushed_at))
        document.getElementById("repocreate").innerText =
        repo.pushed_at
        .replaceAll("T", " @ ")
        .replaceAll("Z", "")
        document.getElementById("repogit").href = repo.html_url
        
        if (repo.has_pages)
        {
            document.getElementById("repopage").href = "https://undefined06855.github.io/" + repo.name
            document.getElementById("repopage").style.opacity = "1"
            document.getElementById("repopage").style.cursor = "pointer"
        }
        else
        {
            document.getElementById("repopage").href = ""
            document.getElementById("repopage").style.opacity = "0.5"
            document.getElementById("repopage").style.cursor = "default"
        }
        
        document.getElementById("repoid").innerText = repo.id
    
    
        document.getElementById("overlay").style.opacity = "1"
        setTimeout(() => { document.getElementById("reponame").style.translate = "0" }, 0)
        setTimeout(() => { document.getElementById("repodesc").style.translate = "0" }, 200)
        setTimeout(() => { document.getElementById("repoid").style.translate = "0"   }, 400)
        setTimeout(() => { document.getElementById("repotime").style.translate = "0" }, 600)
        setTimeout(() => { document.getElementById("lower2").style.translate = "0"   }, 800)
        setTimeout(() => { document.getElementById("lower").style.translate = "0"    }, 2500)
    
        document.addEventListener("keyup", closeDetailedRepoView)

        console.log("Opened detailed view for %s", repo.name)

    })
}

function closeDetailedRepoView(ev)
{
    console.log(ev.key)
    if (ev.key == "Escape")
    {
        document.removeEventListener("keyup", closeDetailedRepoView)

        document.getElementById("overlay").style.display = "none"
        document.getElementById("overlay").style.opacity = "0"

        document.getElementById("reponame").style.translate = "-150%"
        document.getElementById("repodesc").style.translate = "-150%"
        document.getElementById("repoid").style.translate = "-150%"
        document.getElementById("repotime").style.translate = "-150%"
        document.getElementById("lower").style.translate = "-150%"
        document.getElementById("lower2").style.translate = "150%"
    }
}
// #endregion

req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200)
    {
        console.log("Request successful")

        document.getElementById("repo_wrapper").innerHTML = ""

        json = JSON.parse(req.response)

        const stylesheet = document.createElement("style")

        var repid = 0
        json.forEach(repo => {
            if (!(repo.fork || repo.archived || repo.private))
            {
                jsons.push(repo)
                console.log(repo)
                document.getElementById("repo_wrapper").innerHTML +=
                reponame
                .replaceAll("[[TITLE]]", repo.name)
                .replaceAll("[[DESC]]", repo.description === null ? "(No description provided)" : repo.description)
                .replaceAll("[[ID]]", repid)
                .replaceAll("[[URL]]", repo.html_url)
                .replaceAll("[[JSON]]", JSON.stringify(repo))

                stylesheet.textContent +=
                style
                .replaceAll("[[ID]]", repid)
                .replaceAll("[[RAND]]", Math.random() * 3 - 1.5)
                .replaceAll("[[RAND2]]", Math.random() < .5 ? -7 : 7)

                repid++
            }
            else {console.log("Rejected repo %s", repo.name)}
        })

        document.head.appendChild(stylesheet)
    }
    else console.log("State change to %s", req.status) 
}

req.open("get", "https://api.github.com/users/undefined06855/repos")
req.send()

window.addEventListener("resize", () => {
    if (document.body.offsetWidth < 500)
    {
        document.getElementById("repo_wrapper").classList.remove("row")
        document.getElementById("repo_wrapper").classList.add   ("column")
    }
    else
    {
        document.getElementById("repo_wrapper").classList.add   ("row")
        document.getElementById("repo_wrapper").classList.remove("column")
    }
})

if (document.body.offsetWidth < 500)
{
    document.getElementById("repo_wrapper").classList.remove("row")
    document.getElementById("repo_wrapper").classList.add   ("column")
}
else
{
    document.getElementById("repo_wrapper").classList.add   ("row")
    document.getElementById("repo_wrapper").classList.remove("column")
}

document.getElementById("corner_image").addEventListener("click", () => 
    window.location.href = "https://github.com/undefined06855"
)

document.getElementById("corner_click").addEventListener("click", () => 
    window.location.href = "https://github.com/undefined06855"
)

setTimeout(() => {
    console.log("checking if wifi bad... %s", document.getElementById("repo_wrapper").children.length === 0 ? "yeah..." : "nope!" )
    if (document.getElementById("repo_wrapper").children.length === 0)
    {
        document.getElementById("repo_wrapper").classList.remove("row")
        document.getElementById("repo_wrapper").classList.add("column")
        document.getElementById("repo_wrapper").innerHTML = "There was an unknown error when trying to load my projects.<br/>In the meantime, try my Github instead.<a href=\"https://www.github.com/undefined06855\">Github</a>"
    }
}, 5000)
