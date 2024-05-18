let input_img = document.getElementById('input-img');
let user_Profile = document.querySelectorAll('.User_img');
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file || !file.type.match('image.*')) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgSrc = event.target.result;
        user_Profile.forEach(el =>{el.src = imgSrc;})
        localStorage.setItem('UserProfile', imgSrc);
    };
    reader.readAsDataURL(file);
}
input_img.addEventListener('change', handleFileSelect);

const savedImageSrc = localStorage.getItem('UserProfile');
if (savedImageSrc) {
    user_Profile.forEach(el =>{el.src = savedImageSrc;})
}else{user_Profile.src = "./SRC/image/bgCover_Report.jpg"};

let user_Name = document.querySelector('.user_Name');
let userName = localStorage.getItem('userName');
user_Name.innerHTML = userName;

//! The Dashboard functionality 
const docker2 =  document.querySelector('.docker-2');
const dash_links = document.querySelectorAll('.dash_link');

const Dashboard_dash = document.getElementById('Dashboard_dash');
const Activity_dash = document.getElementById('Activity_dash');
const Saved_dash = document.getElementById('Saved_dash');
const Schedule_dash = document.getElementById('Schedule_dash');
const Settings_dash = document.getElementById('Settings_dash');

let Cards_holder = document.getElementById('Cards_holder');
let SavedDocker = document.getElementById('SavedElements');
let ActivityDocker = document.getElementById('ActivityDocker');
let ScheduleDocker = document.getElementById('ScheduleDocker');
let SettingsDocker = document.getElementById('SettingsDocker');

Dashboard_dash.onclick = function() {
    Dashs(Cards_holder,Dashboard_dash);
};
Activity_dash.onclick = function() {
    Dashs(ActivityDocker,Activity_dash);
};
Saved_dash.onclick = function() {
    Dashs(SavedDocker,Saved_dash);
   document.getElementById('SavedDocker').style.display = 'block';

};
Schedule_dash.onclick = function() {
    Dashs(ScheduleDocker,Schedule_dash);
};
Settings_dash.onclick = function() {
    Dashs(SettingsDocker,Settings_dash);
};

// Initial call to set the default view
Dashs(Cards_holder,Dashboard_dash);
function Dashs(El,dsh) {
    // Hide all Dashboard items
    const DasboardCards = document.querySelectorAll('.Docker-item');
    DasboardCards.forEach(el => {
        el.style.display = 'none';
    });
    El.style.display = 'flex';
    dsh.onclick = ()=>{
      let dsh_In = dsh.querySelector('.dsh');
      let summary = document.querySelector('#summary');
      summary.innerText = dsh_In.innerHTML;
    }
    // toggle the active class on the dashes
    dash_links.forEach(dash => dash.classList.remove('active_dash'));
    dsh.classList.add('active_dash');
    // close the details Element whene ever we clcik on an Element
    document.addEventListener('click', function(event) {
      var clickedElement = event.target;
      var detailsElement = clickedElement.closest('details');
      if (detailsElement !== null) {
          var allDetails = document.querySelectorAll('details');
          allDetails.forEach(function(details) {
              details.removeAttribute('open');
          });
      }
  });
}

  // inputColrs changes 
  let Color_1 = document.getElementById('color-1');
  Color_1.addEventListener('change',()=>{
     console.log(Color_1.value);
     localStorage.setItem('firstColor',Color_1.value);
  })
  let Color_2 = document.getElementById('color-2');
  Color_2.addEventListener('change',()=>{
     console.log(Color_2.value);
     localStorage.setItem('SecondColor',Color_2.value);
  })
  let firstColor = localStorage.getItem('firstColor');
  Color_1.value = firstColor;
  let SecondColor = localStorage.getItem('SecondColor');
  Color_2.value = SecondColor;
 
// changing the user name functionality
const Modal = document.querySelector('.dialog');
let OpenModal = document.querySelector('.open-modal');
let CloseModal = document.querySelector('.close-modal');
OpenModal.addEventListener('click',()=>{
    Modal.style.display = 'flex';
});
CloseModal.addEventListener('click',()=>{
    Modal.style.display = 'none';
});
// toggling the Modal functionality
let newuserName = document.querySelector('#newName');
let dialogForm = document.getElementById('dialog-form');
dialogForm.addEventListener('submit',()=>{
  let new_name = newuserName.value;
    console.log(new_name);
    user_Name.innerHTML = new_name;
    localStorage.setItem('userName',new_name);
    Modal.style.display = 'none';
})

  //   ------------------------ Traffic Cahrt ---------------------
    let SocialColor = localStorage.getItem('firstColor');
    let OrganiclColor = localStorage.getItem('SecondColor');
    const ctx_2 = document.getElementById('traffic_Chart');
  new Chart(ctx_2, {
    type: 'doughnut',
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: ['Social Media','Organic Search'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19],// of 64
        borderWidth: 1,
        backgroundColor:[SocialColor,OrganiclColor],
        consoleFunction:function(){
          console.log(ctx_2.data)
        }
      }]
    },
    options: {
      plugins: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
});

  //   ------------------------ Chart js Liberary ---------------------
  const ROI = document.getElementById('ROI');
  new Chart(ROI, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

//   ------------------------ Chart js Liberary ---------------------
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor:[
          'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'orangered'
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });



const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const summary = document.querySelector('summary');
const details = document.querySelector('details');

summary.addEventListener('click',() =>{
  details.toggleAttribute('open');
  // console.log(details);
});
screenWidth < '780'?details.removeAttribute('open'):details.setAttribute('open');
screenWidth < '780'?console.log('small screen width matched'):console.log('Large screen width matched');