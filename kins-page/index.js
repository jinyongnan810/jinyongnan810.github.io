const MarkdownIt = require('markdown-it')
var hljs = require('highlight.js')
// pull doms
const headerEl = document.getElementById('header')
const sidebarEl = document.getElementById('sidebar')
const contentEl = document.getElementById('content')
const siteTitleEl = document.getElementById('site-title')

// consts
const host = 'http://csc-conference.southeastasia.cloudapp.azure.com:8000'

// vars
let memos = []
let memoEls = []
// get initial memo
const showFirst = +(window.location.search.replace(/\?id=/, ''))

let md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) { }
        }

        return ''; // use external default escaping
    }
})

// functions
// fetch data
const fetchData = async () => {
    try {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/${host}/publicApi`)
        memos = await res.json()
        memos = memos.sort((a, b) => new Date(b.update_at) - new Date(a.update_at))
    } catch (error) {
        console.log(error)
    }
}
// init
const init = async () => {
    await fetchData()
    initRenderer()
    if (memos.length == 0) return

    memos.forEach((memo, index) => {
        // replace link
        memo.content = memo.content.replace(/download\?path/g, `${host}/download?path`)

        // create dom
        const newEl = document.createElement('div')
        newEl.className = "title"
        newEl.id = `title-${memo.id}`
        newEl.setAttribute('data-index', index)
        newEl.innerText = memo.title
        memoEls.push(newEl)
        sidebarEl.appendChild(newEl)
        newEl.addEventListener('click', e => {
            setCurrent(memos[+e.target.getAttribute('data-index')])
        })
    })
    if (showFirst) {
        let index = 0;
        memos.forEach((m, i) => {
            if (m.id == showFirst) {
                index = i
            }
        })
        setCurrent(memos[index])
    } else {
        setCurrent(memos[0])
    }

}
// set current
const setCurrent = (memo) => {
    headerEl.innerText = memo.title
    contentEl.innerHTML = md.render(memo.content)
    const pre = document.querySelector('.current')
    if (pre)
        pre.classList.remove('current')
    const current = document.getElementById(`title-${memo.id}`)
    current.classList.add('current')
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
// init renderer
const initRenderer = () => {
    var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        tokens[idx].attrPush(['target', '_blank']);
        return defaultRender(tokens, idx, options, env, self);
    };
}

// event handlers
siteTitleEl.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
})


// init
init()