# Stock Take/Order Sheet [WIP]

### *Project #2*

**I will be updating this doc as I make changes.**  
*(If youre curious about why my edits sometimes look copied and pasted, it's cause I work on my projects in VS and upload when I'm satisfied.  
I'm shy)*  
  
This project is also based on a task at my previous workplace (*like the Cash Up App*).  
Our stock take and orders were documented on printed templates for filing.  
#### The contents of these documents were:  
- Item Name (*Printed on as they barely changed*).
- Available Stock (*Written in with pen*).
- Stock Required (*Written in with pen as this changes based on average demand updates the previous 3 weeks*).
- Stock to Order (*Written with pen, based on missing stock needed to not run out till next order day. Usually the next week*).  
All fields but the *Item Name* field were manually filled in with pen.

The point of this project is to find a way to make this process easier and cleaner.  
Writing the numbers in pen is *fine*, but having a digital page to keep track of, edit, and eventually print would be a lot more reliable **(and always *readable*)**.

### It should let you pick a stock item, add the amounts in their respective fields, then print a document with all the information to file.  
#### Input fields:
- Pick an item: Pick an item to list (*Formatted to add no more than one of each item*)
- Model: Set the model stock in crates/packs (*the amount needed to get through to the next delivery date*)
- Stock: Amount of individual items currently in stock.
- Order: Crates/Packs to order (*will be making it auto fill dependent on the Model and Stock Levels*)

#### Product crate/pack sizes [items per]:
- 300ml PET              -> 24
- 440ml PET              -> 24
- 500ml Glass Returnable -> 20
- 2l PET                 -> 6
- 2l RPET                -> 9
- 500ml Can              -> 24
- 500ml Hot-Fill PET     -> 24
- Pump Bottle            -> 24

### UPDATE:
- Changed colours again <3
- Buttons have some animations on click *

### TO DO:

- Better formatting ?
- Save option.
- Load previous.
- Button that makes a formatted document to print with the info contained.
- Maybe add option to switch to other suppliers (*this one is just Coke for now*).
- ~~Stop it from allowing duplicate fields.~~
- ~~Button animations *~~
- ~~Make Order field auto fill while also allowing edits to it.~~
- ~~Refresh edits button to reset manual changes made to Order field.~~

*The pack/crate sizes will be static, set to the sizes we usually get here when ordering.*  

If you have any ideas to add feel free to tell me!  
I am using these projets to learn, so if my code is making your brain hurt mb *</3*.

PS: I will still be working on previous projects, just need to refresh my head with something else for a change.  
  
**'?'** = *not sure*  
**'*'** = *user appeal*
