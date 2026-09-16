# 9/16/2026

Today was succesful. i ran into many bugs with prisma and passport configuration (mainly prisma). issues were fixed by
- changing how prisma was imported through its adaper
- minor changes to passports structure.

Apart from creating routes and testing them, i of course added login and logout using passports authenticate. created a function on passport to track if a user is authenticated, and ensured my password hash was properly being checked in passport.

all these changes today ensure that not only is prisma and passport working but, users can log in and logout. create accounts and edit and delete their own accounts. (editing is limited to just username as no editing emails will be allowed. password can be changed through a password reset feature implemented in the future)

day complete.

