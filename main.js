import axios from 'axios';
const searchButton = document.getElementById('searchButton');
const main_area = document.getElementById('main')

searchButton.addEventListener('click',(e)=>{
  e.preventDefault()
  const searchInput = document.getElementById('searchInput').value.trim().replace(/\s+/g, "");
  if (!searchInput) {
    alert("Lütfen bir kullanıcı adı girin");
    return;
  }
  axios.get(`https://api.github.com/users/${searchInput}`,)
  .then(response=>{
    renderUser(response);
    console.log(response)
  }).catch(err=>{
    alert("Hatalı Giriş Böyle bir Kullancı yok")
  })

})
function renderUser(response) {
  const { login, name, avatar_url, company, email, bio, followers, following, location } = response.data;
  const userHtmlContent = `
    <div id="github-user-area" class="flex flex-col items-center">
      <div>
        <img class="rounded-full w-48 mt-6" src="${avatar_url}">
      </div>
      <div class="mt-4 text-2xl bg-gray-800 text-white px-2 rounded">${name || login}</div>
      <div class="mt-4">
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${login}</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${company || "Şirket Bilgisi Yok"}</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${location || "Lokasyon Bilgisi Yok"}</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${email || "Email Bilgisi yok"}</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${bio || "Biyografi Bilgisi yok"}</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${followers} followers</span>
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 cursor-pointer">${following} following</span>
      </div>
    </div>
  `;

  const userDiv = document.getElementById('github-user-area');
  if (userDiv) {
    userDiv.innerHTML = userHtmlContent;
  } else {
    const newDiv = document.createElement('div');
    newDiv.id = 'github-user-area';
    newDiv.innerHTML = userHtmlContent;
    main_area.appendChild(newDiv);
  }

}
