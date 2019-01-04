let section = document.getElementById('container'); 

let startBtn = document.getElementById('start-game')

section.addEventListener('click', function(evt) {
    if (evt.target.tagName !== 'BUTTON') return;
    let name = evt.target.getAttribute('data-name');
    let t = game.myPets.find(p => p.name === name);
    t[evt.target.textContent]();
    game.render();
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (min-max) + min)
}  

class Tomagotchi {
    constructor(name, lifeURL, deathURL) {
        this.name = name;
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
        this.lifeURL = lifeURL;
        this.deathURL = deathURL; 
        this.tickChart = {
            hunger: {
                threshold: getRandomNumber(6, 10),
                curCount: 0
            },
            sleepiness: {
                threshold: getRandomNumber(12, 18),
                curCount: 0
            },
            boredom: {
                threshold: getRandomNumber(12, 20),
                curCount: 0
            },
            age: {
                threshold: 30,
                curCount: 0
            }
          
        }
    }
    render() {
        if (this.isDead()) {
            return `
                <div>
                    <h2 class="southText2">You killed ${this.name}!</h2>
                    <img class="South-Park-Dead" src="${this.deathURL}"> 
                </div>
            `
        } else {
            return `
                <div class="characters">
                    <img class="south-park" src="${this.lifeURL}">
                    <h2 class="south-park-text">${this.name}<h2>
                    <div id="categories">
                    <p>Hungry: ${this.hunger}</p>
                    <p>Tired: ${this.sleepiness}</p>
                    <p>Bored: ${this.boredom}</p>
                    <p>Age: ${this.age}</p>
                    </div>
                    <button data-name="${this.name}">feed</button>
                    <button data-name="${this.name}">sleep</button>
                    <button data-name="${this.name}">play</button>
                </div>
            `;
        }
    }
    isDead() {
        return (this.hunger >= 10 || this.sleepiness >= 10 || this.boredom >= 10);
    }
    heartBeat() {
        if (this.isDead()) return;
        for (let condition in this.tickChart) {
            this.tickChart[condition].curCount++;
            if(this.tickChart[condition].curCount === this.tickChart[condition].threshold) {
                this[condition]++; 
                this.tickChart[condition].curCount = 0;
            }
        }
    }
    feed() {
        if(this.hunger >= 4) {
            this.hunger -= 4; 
        }
    }
    sleep() {
        if(this.sleepiness >= 5) {
            this.sleepiness -= 5; 
        }
    }
    play() {
        if(this.boredom >= 4) {
            this.boredom -= 4; 
        } 
    }
}

let game = {
    myPets: [],
    init() {
        this.myPets.push(new Tomagotchi('Kenny', 'images/kenny.gif', 'images/kennyDies.gif'), new Tomagotchi('Stan', 'images/stan.gif', 'images/stanVomit.gif'), new Tomagotchi('Cartman', 'images/cartman3.gif', 'images/cartmanPoop.gif'), new Tomagotchi('kyle', 'images/newerKyle.gif', 'images/kyleCry.gif'));
        this.timerId = setInterval(this.heartBeat.bind(this), 1000);
    },
    heartBeat() {
        this.myPets.forEach(function(pet) {
            pet.heartBeat();
        });
        this.render();
    },
    render() {
        let html = '';
        this.myPets.forEach(function(pet) {
            html += pet.render();
        });
        section.innerHTML = html;
        startBtn.style.visibility = this.myPets.length ? 'hidden' : 'visible'; 
    },

}

startBtn.addEventListener('click', game.init.bind(game));

   

   


