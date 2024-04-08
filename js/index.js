// display sections on clicking on the link
function displaySection(link,section) {
    // link and the section to show
    let lnk = document.querySelector(`#${link}`);
    let sec = document.querySelector(`#${section}`);
    
    // when you click on one of the links
    lnk.onclick = (event) => {
        
        // mobile js
        const mq = window.matchMedia("(max-width: 500px)");
        if(mq.matches) {
            // show the go-back button when a link is clicked in responsive mode . 
            let goBackButton = document.querySelector("#go-back-button");
            goBackButton.style.display = "block";

            // when the go-back button is clicked , it disappears with the main and the menu should reapear .
            goBackButton.addEventListener("click",() => {
                // hide the mainSection
                sec.style.display = "none";       
                let menu = document.querySelector("#menu");
                menu.style.display = "flex";
                goBackButton.style.display = "none";
                lnk.classList.remove("active");
         
            });
            lnk.parentElement.style.display = "none"; 
            if(section == "skills-section") {
                let div = document.querySelector(`#${section} > article`);
                div.style.display = "flex";
                div.style.flexDirection = "column";
                let subElement = document.querySelectorAll(`#${section} li`);
                for (se of subElement){
                    se.style.fontFamily = "roboto mono";
                }
                
            } else if (section == "projects-section") {
                let s = document.querySelector("#projects-wrapper");

                s.style.display = "flex";
                s.style.flexDirection = "column";

            } else if (section == "links-section") {
                let linkWrapper = document.querySelector(`#${section} div`);
                linkWrapper.style.display = "flex";
                linkWrapper.style.flexDirection = "column";

            }
            sec.classList.remove("section");
            sec.style.display = "block";
            sec.style.animationName = "section-mobile";
            sec.style.animationDuration = "1.2s";
        } else {
            
            // remove the section from sight
            for(elem of sec.parentElement.children){
                elem.style.display = "none";
            }
            // remove the about-me-intro
            let aboutMeIntroSection = document.querySelector("#about-me-intro-section");
            aboutMeIntroSection.style.display = "None";

            sec.classList.remove("section");
            sec.style.display = "block";
            sec.style.animationName = "section";
            sec.style.animationDuration = "0.6s";
            sec.style.animationFillMode = "forwards";
            

            let menu = document.querySelector("#menu");
            menu.style.marginTop = "0px";
            menu.style.display = "flex";
            menu.style.position = "fixed";
            menu.style.top = "1vw"; 
            menu.style.transition = "All 1s";
            menu.style.marginTop="0px";
            menu.style.right= "15vw";

            event.preventDefault() ;
            lnk.classList.add("active");
        }
        
        let jiran = lnk.parentElement.children;
        for(j of jiran){
            j.classList.remove("active");
        }

            event.preventDefault() ; 
            lnk.classList.add("active");

    };
}

// dark and light mode 
document.documentElement.style.setProperty('--background-color', '#fafafa');
function switchDarkLightMode() {
    let icon = document.querySelector("#switch-container img");
   
    icon.onclick = () => {
    let darkColor = "#111216"; 
    let darkTextColor = "#999";
    let darkTextTitleColor = "#eee";
    let darkTextHoverColor = "#ddd";
    let darkAccentColor = "#222";
    icon.onmouseover = () => {
        console.log("James");
        icon.setAttribute("src","images/moon-full.svg");
    }
    icon.onmouseout = () => {
        icon.setAttribute("src","images/moon.svg");
    }
    let color = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
    if(color == "#fafafa"){
        icon.setAttribute("src","images/sun.svg");
        document.documentElement.style.setProperty('--background-color',darkColor);
        document.documentElement.style.setProperty('--text-color',darkTextColor);
        document.documentElement.style.setProperty('--text-title-color',darkTextTitleColor);
        document.documentElement.style.setProperty('--text-hover-color',darkTextHoverColor);
        document.documentElement.style.setProperty('--light-accent-color',darkAccentColor);
        icon.onmouseover = () => {
                icon.setAttribute("src","images/sun-filled.svg");
        }
        icon.onmouseout = () => {
                icon.setAttribute("src","images/sun.svg");
        }
    
    } else {
        icon.setAttribute("src","images/moon.svg");
        document.documentElement.style.setProperty('--background-color', '#fafafa');
        document.documentElement.style.setProperty('--text-color', '#111');
        document.documentElement.style.setProperty('--text-hover-color',"#000");
        document.documentElement.style.setProperty('--text-title-color',"#111");
        document.documentElement.style.setProperty('--light-accent-color',"#ccc");

        icon.onmouseover = () => {
            console.log("James");
            icon.setAttribute("src","images/moon-full.svg");
        }
        icon.onmouseout = () => {
            icon.setAttribute("src","images/moon.svg");
        }
    }
    }
}
// Get the canvas element
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store the particles
const particles = [];

// Create a function to generate random particles
function createParticle(x, y) {
  return {
    x: x,
    y: y,
    radius: Math.random() * 5 + 1,
    opacity: Math.random(),
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
  };
}

// Create a function to update the particles
function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.opacity -= 0.01;

    // Remove the particle if it's no longer visible
    if (particle.opacity <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

// Create a function to draw the particles
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const gradient = ctx.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      particle.radius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

// Create a function to handle mouse movement
function handleMouseMove(event) {
  const x = event.clientX;
  const y = event.clientY;

  // Create new particles at the mouse position
  for (let i = 0; i < 5; i++) {
    particles.push(createParticle(x, y));
  }
}

// Add event listener for mouse movement
document.addEventListener('mousemove', handleMouseMove);

// Animation loop
function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

// Start the animation
animate();  


switchDarkLightMode();
displaySection("about-me","about-me-section");
displaySection("skills","skills-section");
displaySection("projects","projects-section");
displaySection("links","links-section");
