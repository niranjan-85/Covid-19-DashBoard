
// Click on Explore button 

const explore = document.getElementById('explore-btn');
const sidebar = document.querySelector('.menu-list');
const links = document.querySelectorAll('.links');

// smooth transition
explore.addEventListener('click',(event)=>{
    sidebar.classList.toggle('open');
})

// close navbar if link is clicked

links.forEach(item => {
    item.addEventListener('click',()=>{
        sidebar.classList.remove('open');
    })
})
