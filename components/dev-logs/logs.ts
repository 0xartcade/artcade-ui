export const logs = [
  {
    date: "2024-12-02",
    title: "system architecture",
    author: "mpeyfuss",
    content: `gm

I think we have a good system architecture planned. To start, we'll target crypto-native users but put all gameplay into a PWA so your phone is your companion in a way, even if you access the main site from your phone.

DRF is already proving to be a great choice. We are forgoing Privy or Dynamic as they complicate things imo, and cost a lot. Syncing users to our db just is something that take a lot of effort and I'm not convinced these solutions are "it". Much more interested in Coinbase Smart Wallet type solutions.

I'm excited to build my first PWA.

Still architecting exact contract structure, but have a good headstart on it.

Onwards and upwards.

  `},
  {
    date: "2024-12-01",
    title: "rapid prototyping",
    author: "scobel",
    content: `
  
rapid prototyping is humming now

i've been making changes, testing and updating the [ui-exporations](https://github.com/0xartcade/ui-explorations) repo constantly

we've got a mobile version showing in a emulator in the browser [0xArtcade Sandbox](https://sandbox.0xartcade.xyz)

if you add home screen on mobile you get a progressive web app experience

i think this is how we'll do it for production. no desktop version. play in the phone.

can't have advantages of playing with a full screen on a desktop.

  `},
  {
    date: "2024-12-01",
    title: "unicorn mode",
    author: "scobel",
    content: `
    
i'm really blown away by what things like cursorai is capable of

have a clean version of the ui-sandbox running on my local machine

have a friend over and i'm having them test via my machines ip on their phone

this is how crazy AI is. me "this is how crazy AI is" come up with a concept

friend "make a unicorn mode" 

me to cursor "make this unicorn mode. no more unicorn. even more unicorn"

three prompts later and we have this [unicorn mode](https://ui-explorations-git-scobel-unicorn-mode-artcade.vercel.app?_vercel_share=IMmax6flrb2Je0QqGND18JdH8WIsiH2S)

guess 4 out of 4 and things get weird

this is going in the game as an easter egg. shhhhh
  
  `},
  {
    date: "2024-11-30",
    title: "game designs",
    author: "scobel",
    content: `
  
starting to design some of the game screens in [Figma](https://www.figma.com/design/Vwq3VcuZgdpqECNxdNbr47/0xArtcade---Designs?node-id=28-7&t=MdNWNcn35FmvEv8l-1)

i don't do ui/ux for a living but i'm fairly comfortable in here

i find myself more and more using tools like v0 and cursor to live prototype

something about actually seeing it on screen and being able to interact feels better

i'm using tailwind and a plugin called [tailscan](https://tailscan.com/) to build out the ui

i wonder what marco will think when i hand him poorly written react components instead of figma screens lol

we're going to find out soon i suppose

  `},
  {
    date: "2024-11-30",
    title: "real game data",
    author: "scobel",
    content: `
we are using metadata for nfts to drive our games.

marco setup repo called [artcade-data-collection](https://github.com/0xartcade/artcade-data-collection)

he wrote a script that pulls data from the simplehash api and translates it to usable json for our games.

right now we're just storing it as a json file but he'll have it in a database soon.

in the meantime, i can use it to test some ui/ux for the games

going to try to use 6529 collections "the memes" for the prototype
  `},
  {
    date: "2024-11-30",
    title: "ui sandbox",
    author: "scobel",
    content: `
    
while i work on some figma designs, i thought i would make a little sandbox for testing

marco set us up with a repo called ui-explorations connected to vercel

i can use things like cursorai and v0 to test out ui components and prototypes

you can check it out at [ui-explorations](https://ui-explorations.vercel.app/)

been testing a few interfaces and components we talked about

something about the little tags that twitter/x uses for "subjects" when you join...

  `},
  {
    date: "2024-11-29",
    title: "logo design",
    author: "scobel",
    content: `
    
came up with a pretty neat little logo design for 0xArtcade.

we decided on this color pallete #52DBFF, #7637FE, #FDECCF, #FF3D5D, #FF3DDC

this font Moniton

and then just made the logo with the type + some gradients, outlines and shadows.

then i traced out a little arcade cabinet using the color pallete in figma

makes for a nice little svg logo to use together 

you can see it in the background of this page now

  `},
  {
    date: "2024-11-28",
    title: "project tracking",
    author: "scobel",
    content: `
    
i spent a few years (ok a decade) as a product manager for startups in tech

i can't help but track everything

probably will drive people crazy but it helps me organize (and sleep at night)

i setup a little github project to track [shapecraft hackathon 2024](https://github.com/orgs/0xartcade/projects/4)

check out our [website](https://0xartcade.xyz) or follow us on [twitter](https://twitter.com/0xartcade)
  
  `},
  {
    date: "2024-11-27",
    title: "brand inspiration",
    author: "scobel",
    content: `
    
i've been thinking alot about brand inspiration for 0xArtcade. 

i was born in Niagara Falls, Ontario, Canada and often went to a place called [Clifton Hill](https://www.cliftonhill.com/). 

it was like sloped boardwalk with games and arcades. 

i just love the old 80s and 90s arcade aesthetic. 

the neon, the colors, the sounds. i want to lean into that. 

at the same time i love the modern design of Apples glassui and spatial interfaces. 

the idea of depth with a touch of color and a hint of neon just speaks to me. 

you can check out some of the inspiration [here](https://www.figma.com/design/Vwq3VcuZgdpqECNxdNbr47/0xArtcade---Designs?node-id=61-105&t=MdNWNcn35FmvEv8l-1) (password is foreverworlds)
  `},
  {
    date: "2024-11-26",
    title: "what's in a name?",
    author: "scobel",
    content: `
  
i honestly can't remember how we came to this 0xArtcade brand. i think it went something like "Marco - we should make a framework and platform for any art based game to exist onchain. what should we call it"

"scobel - the artcade" 

"marco - let's drop the the"

"scobel - let's add 0x" 

and here we are. 0xArcade is born. a place to play art based games onchain. a place to earn awards. a place to support artists.

now we just need a slogan. "gamified art exploration" isn't going to cut it
  `},
  {
    date: "2024-11-25",
    title: "weekend warrior",
    author: "mpeyfuss",
    content: `gm

I've scaffolded the API and smart contracts repo over the weekend. I decided to do that instead of paying attention to the pump dot fun live stream fiasco. This was a better use of my time.

We've also sorted out a lot of the architecture from a high level on the contract structure and how the API will be built.

I like python and I like boring API frameworks, as they enable me to code faster. So I chose Django REST Framework to build our API. If you don't like it, too bad :)

It's time to build now.`
  },
  {
    date: "2024-11-20",
    title: "start at the beginning",
    author: "scobel",
    content: `gm

here we are. i'm not even sure where to begin, so let's start with how we got here. 

my introduction to the blockchain was in 2018 with an on-chain clean water project i led here in canada. but my real introduction was in early 2021 when a handful of artists like myself began to learn about "NFTs" and the impact they could potentially make on the art world.

a few months later, dozens turned to hundreds, then thousands as artists from across genres, disciplines, with varrying skills and experience began "minting" their art on-chain as NFTs and real people started to buy them. 

this was a revelation in the art community and a revolution in the crypto community. could artists finally ignore the algorithms? could they ignore the painful clients? could they actually create what they wanted to create? and could they actually make an honest living? 

could the starving artist finally become a bug, not a feature of the system. 

we almost got there. we really did. we went from developer meetups at the Denver Sports Castle at ETH Denver in 2020 to artists and collectors living it up at art events and parties in Art Basel Miami in 2021 (for the record, i prefer the former but you get the point).

but then, as quickly as it happened it crashed. prices dropped, sales ended, and artists returned to their previous life (some of us with tax bills more than we made). what was left was those who either reached exist velocity with their sales, were too stubborn and bullish on the potential to leave, or had nowhere else to go. 

this project is about reversing this course. fixing history. getting us back onto the path we were on. a path that focused on art. a path that uplifted artists. a path breathed real color, real life, real vibrance into world changing but ultimately boring technology.

time to get to work.`
  },
  {
    date: "2024-11-19",
    title: "init commit",
    author: "mpeyfuss",
    content: `hello world...
    
welcome to 0xArtcade...

more to come...`
  },
];