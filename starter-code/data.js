const fetchData = (event) => {
    event.preventDefault()
    document.querySelector("#input-error").style.visibility = "hidden";
    let username = event.target.elements["username"].value !== "" ?
                   event.target.elements["username"].value  : 
                   "octacat"
        
    let url = `https://api.github.com/users/${username}`
    fetch(url)
        .then(response => handleError(response))
        .then(response => response.json())  
        .then(data => handleData(data))
        .then(VirtualDOM => render(VirtualDOM))
}

const handleError = (response) => {
    if(!response.ok) {
        initialRender()
        let errorDOMElement = document.querySelector("#input-error")
        errorDOMElement.style.visibility = "visible";
        if(response.status === 404) {
            errorDOMElement.innerText = "No results."
            throw "404 Result not found"
        }
        if(response.status === 403) {
            errorDOMElement.innerText = "Server error. Try again later"
            throw "403 Server error. Try and fix that. LOL"
        }
        throw Error(response.status)
    } 
    return response
}

const handleData = (data) => {
    const handleDate = (date) => {
        let d = new Date(date)
        if (!isNaN(d.getDate())) {
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        }
        return "Not Available"
      }
    
    let VirtualDOM = {
        avatar_url: data.avatar_url,
        name: data.name || data.login || "Not Available",
        login: `@${data.login}` || "Not Available",
        created_at: `Joined: ${handleDate(data.created_at)}`,
        bio: data.bio || "This profile has no bio",
        public_repos: data.public_repos || "Not Available",
        followers: data.followers ?? "Not Available",
        following: data.following ?? "Not Available",
        location: data.location ?? "Not Available",
        twitter_username: data.twitter_username ? `https://www.twitter.com/${data.twitter_username}` : "Not Available",
        blog: data.blog || "Not Available",
        company: data.company ? `https://www.github.com/${data.company.replace("@", "")}` : "Not Available",
    }
    sessionStorage.setItem("CurrentGithubUserData", JSON.stringify(VirtualDOM))
    return VirtualDOM
}

const render = (VirtualDOM) => {
    for (let VirtualElement in VirtualDOM) {
        let element = document.querySelector(`#${VirtualElement}`)
        if(VirtualElement==="avatar_url") {
            element.src = VirtualDOM[VirtualElement]
        } else if (
            VirtualElement ==="public_repos" 
            || VirtualElement === "followers"
            || VirtualElement === "following") {
            element.querySelector(".accountInfoNumber").innerText = VirtualDOM[VirtualElement]
        } else if(
            VirtualElement === "location" 
            || VirtualElement ==="twitter_username"
            || VirtualElement === "blog"
            || VirtualElement === "company") {
            element.href = VirtualDOM[VirtualElement]
            element.querySelector("h3").innerText = VirtualDOM[VirtualElement]
        } else {
            element.innerText = VirtualDOM[VirtualElement]
        }
    }
    markUnavailable(".userLocations")
}

const initialRender = () => {
    if(sessionStorage.getItem("CurrentGithubUserData")) {
        render(JSON.parse(sessionStorage.getItem("CurrentGithubUserData")))
    } else {
        handleData(new NullUserObject())
    }
}

const markUnavailable = (className) => {
    let elements =[...document.querySelectorAll(className)]
    elements = elements.filter(element => element.innerText.trim() === "Not Available")
    elements.forEach(element => element.classList.add("unavailable"))
}

class NullUserObject {
    constructor() {
        this.avatar_url = "https://avatars.githubusercontent.com/u/583231?v=4"
        this.name = "The Octocat"
        this.login = "octocat"
        this.created_at = "Joined"
        this.bio = "This profile has no bio",
        this.public_repos = "8"
        this.followers = "3988"
        this.following = "9"
        this.location = "San Francisco"
        this.twitter_username = ""
        this.blog = "https://github.blog"
        this.company = "github"
    }
}

initialRender()
