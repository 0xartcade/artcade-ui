interface DevLog {
  date: string;
  title: string;
  author: string;
  content: string;
}

export const logs: DevLog[] = [
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
  `}
]; 