# 9/16/2026

Today was succesful. i ran into many bugs with prisma and passport configuration (mainly prisma). issues were fixed by
- changing how prisma was imported through its adaper
- minor changes to passports structure.

Apart from creating routes and testing them, i of course added login and logout using passports authenticate. created a function on passport to track if a user is authenticated, and ensured my password hash was properly being checked in passport.

all these changes today ensure that not only is prisma and passport working but, users can log in and logout. create accounts and edit and delete their own accounts. (editing is limited to just username as no editing emails will be allowed. password can be changed through a password reset feature implemented in the future)

day complete.


# 9/21/2026

Today was another success i created the folder routes and controllers. this was done by migrating the schema and updating client to incude parent id and parent and child relations for the database. 

i then created, crud routes as well as viewing all folders at the root this was done by viewing all folders that dont have a parent id. and created a move route which works by changing the parent id after checking if folder of course belongs to user and if destination folder or positon belongs to user. before allowing user to switch folder position to another folder or null. 

these additions ensure that users have full crud control over their own folders as well as hirearchy control in terms of viewing and moving through the tree.

day complete.

