let allPosts;
let readCount = 0;
const loadData = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    // const posts = data.data;
    allPosts = data.posts;
    console.log(allPosts);
    displayPosts(allPosts);
}

const displayPosts = allPosts =>{
    const postContainer = document.getElementById('post-container');
    const postnewCardcontainer = document.createElement('div');
    postnewCardcontainer.classList ='flex flex-col w-2/4';
  

    allPosts.forEach((post, index) =>{
        console.log(post);
        const postCard = document.createElement('div');
        postCard.classList ='card card-side flex bg-[#797dfc1a] p-6 mb-4 rounded-2xl relative';

        const circleColor = post.isActive?'green':'red';
        const activeIndicator = `
        <div class="absolute top-24 left-20 translate-x-2 -translate-y-1 mr-2 w-3 h-3 rounded-full bg-${circleColor}-500"></div>;
        `
        postCard.innerHTML = `
        
        <figure><img class=" relative w-[72px] h-[72px]" src="${post.image}" />${activeIndicator}</figure>
          <div class="card-body">
            <div class="flex">
              <p>#${post.category}</p>
              <p>Author :${post.author.name}</p>
            </div>
            <h2 class="card-title">${post.title}</h2>
            <p class="text-[#12132D99]">${post.description}</p>
            <div class="card-actions justify-between">
              <div class="space-x-2">
                <i class="fa-regular fa-message"><span class="ml-2">${post.comment_count}</span></i>
                <i class="fa-regular fa-eye"><span class="ml-2">${post.view_count}</span></i>
                <i class="fa-regular fa-clock"><span class="ml-2">${post.posted_time} min</span></i>
              </div>
              <button onclick="addbuttonClick(this.getAttribute('data-index'))" data-index="${index}" id="btn-add" class="btn bg-green-500 text-white text-[18px]"><i class="fa-regular fa-envelope-open"></i></button>
            </div>
          </div>
        `;

        postnewCardcontainer.appendChild(postCard);
    });

    postContainer.appendChild(postnewCardcontainer);


    const infoContainer = document.createElement('div');
    infoContainer.id = 'info-container';
    infoContainer.classList = 'bg-[#12132D0D] w-1/4 p-4';

    infoContainer.innerHTML=`
        <div class="flex justify-between p-4">
            <h2 class="text-[20px]">Tiltle</h2>
            <p class="text-[16px] text-[#12132D99]">Mark as read <span id="read-count">(0)</span></p>
          </div>
    `;

    postContainer.appendChild(infoContainer);
}


// function addbuttonClick(){
//   const buttonAdd = document.getElementById('btn-add');

//   buttonAdd.addEventListener('click',function(){
//   const titleC = post.title;
//   const viewcount = post.view_count;

//   const tableRowDiv = document.createElement('div');
//   tableRowDiv.classList = 'bg-white';
//   const tableRow = document.createElement('table');
//   tableRow.classList ='table';
//   tableRow.innerHTML=`
//                   <thead>
                    
//                   </thead>
//                   <tbody class="text-[24px]">
//                     <!-- row 1 -->
//                     <tr>
//                       <td>${post.title}</td>
//                       <td>${post.view_count}</td>
//                     </tr>
//   `;

//   tableRowDiv.appendChild(tableRow);
//   infoContainer.appendChild(tableRowDiv);

//   })
// }


const addbuttonClick = (index) =>{
  selecPost = index;
  const post = allPosts[index];

  const infoContainer = document.getElementById('info-container');
  const table = document.createElement('table');
  const tr = document.createElement('tr');
  const tdTitle = document.createElement('td');
  const tdViewCount = document.createElement('td');

  tdTitle.textContent = post.title;
  // tdViewCount.textContent = post.view_count;
  tdViewCount.innerHTML=`<i class="fa-regular fa-eye"></i> <span class="ml-2">${post.view_count}</span>`;

  tr.appendChild(tdTitle);
  tr.appendChild(tdViewCount);
  table.appendChild(tr);

  table.style.backgroundColor='white';
  table.style.marginBottom='20px';
  tdTitle.style.paddingRight='5px';
  tdTitle.style.paddingTop='16px';
  tdTitle.style.paddingBottom='16px';
  tdTitle.style.paddingLeft='15px';
  tdTitle.style.width='50%';

  tdViewCount.style.paddingRight='12px';
  tdViewCount.style.whiteSpace='nowrap';
  tdViewCount.style.textAlign='right';
  table.style.fontSize='16px';



  // infoContainer.innerHTML = '';
  infoContainer.appendChild(table);

  readCount++;
  document.getElementById('read-count').textContent=readCount;


}


loadData();


const loadallPostData = async() =>{
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  const alllatestPost = data
  console.log(alllatestPost);
  displayAllPosts(alllatestPost);
}

const displayAllPosts = alllatestPost =>{

  const postlatestContainer = document.getElementById('lpost-container');


  alllatestPost.forEach(latestPost =>{
    console.log(latestPost);
    const postlatestCard = document.createElement('div');
    postlatestCard.classList ='card w-96 bg-base-100 shadow-xl p-6';
    postlatestCard.innerHTML=`
            <figure><img src="${latestPost.cover_image}" alt="Shoes" /></figure>
            <div class="card-body">
              <p class=""><i class="fa-regular fa-calendar-days"><span class="ml-2">${latestPost.author.posted_date}</span></i></p>
              <h2 class="card-title">${latestPost.title}</h2>
              <p>${latestPost.description
              }</p>
              <div class="card-actions flex">
                <img class="w-[44px] h-[44px] rounded-full" src="${latestPost.profile_image}" alt="">
                <div class="flex flex-col ml-2">
                  <h2>${latestPost.author.name}</h2>
                  <p>${latestPost.author.designation}</p>
                </div>
              </div>
            </div>
    `;

    postlatestContainer.appendChild(postlatestCard);
  })
}

loadallPostData();
// addbuttonClick();