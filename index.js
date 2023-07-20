let my_leads =[];
const input_el = document.getElementById("input-el");
const input_btn = document.getElementById("input-btn");
const tab_btn = document.getElementById("tab-btn");
const delete_btn = document.getElementById("delete-btn");
const ul_el = document.getElementById("ul-el");

const leads_from_local_storage = JSON.parse(localStorage.getItem("myLeads"));


if(leads_from_local_storage){
    my_leads = leads_from_local_storage;
    render(my_leads);
}



tab_btn.addEventListener("click", function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        my_leads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(my_leads));
        render(my_leads);
    })
    
})

 delete_btn.addEventListener("dblclick", function(){
     localStorage.clear();
     my_leads = [];
     render(my_leads);
 })

input_btn.addEventListener("click", function save_btn (){
      my_leads.push(input_el.value);
      input_el.value = "";
      localStorage.setItem("myLeads", JSON.stringify(my_leads));
      render(my_leads);
});
function render(leads){
    let list_items = "";
    for(let i=0; i<leads.length; i++){
    list_items += `
        <li> 
        <a href=' ${leads[i]} ' target='_blank'>  ${leads[i]} </a> 
        </li>`;
    }
    ul_el.innerHTML = list_items;    
}
