#!/bin/bash

#scaffolding the vote module 
ignite scaffold module vote --dep bank,staking

#scaffolding the message for create-vote tx
ignite scaffold message create-vote receiver count:uint operation:uint mode:uint --module vote

#scaffolding the log list of all the create-vote transactions happened
ignite scaffold list vote-log voter receiver count:uint operation:uint mode:uint --no-message --module vote

#scaffolding the map that stores the value of vote casted with address as the key
ignite scaffold map vote-casted count:uint --no-message --module vote

#scaffolding the map that uses address as the key and ballot information as value
ignite scaffold map ballot count:uint sign:uint --no-message --module vote

#scaffolding the map that stores the postive and negative votes casted by one person on another
ignite scaffold map book positive:uint negative:uint --no-message --module vote

#1 = positive,cast vote
#0 = negative,uncast vote
