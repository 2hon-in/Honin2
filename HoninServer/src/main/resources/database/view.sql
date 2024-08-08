create view secondhandimagesselectview as
    select s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title,
           s.writedate, i.sinum, i.savefilename from secondhand s join simages i on i.snum=s.snum;

drop view secondhandimagesselectview
