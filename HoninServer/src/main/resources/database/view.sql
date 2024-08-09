CREATE VIEW secondhandimagesselectview AS
SELECT s.snum, s.content, s.price,s.readcount,s.seller, s.state, s.title, s.writedate,
    JSON_ARRAYAGG(i.savefilename) AS images
FROM secondhand s LEFT JOIN simages i ON i.snum = s.snum
GROUP BY s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate;


drop view secondhandimagesselectview
