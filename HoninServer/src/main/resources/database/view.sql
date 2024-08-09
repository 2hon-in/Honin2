CREATE VIEW secondhandimagesselectview AS
SELECT s.snum, s.content, s.price,s.readcount,s.seller, s.state, s.title, s.writedate,
    JSON_ARRAYAGG(i.savefilename) AS images
FROM secondhand s LEFT JOIN simages i ON i.snum = s.snum
GROUP BY s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate;


-- drop view secondhandimagesselectview


-- CREATE VIEW Top10Posts AS
-- WITH LikeCounts AS (
--     -- cfree 게시판
--     SELECT
--     'cfree' AS board_name,
--     cfree.title AS title,
--     cfree.cfnum as cfnum,
--     COUNT(cfreelike.cflnum) AS like_count
-- 	FROM
-- 		honin.cfree
-- 	LEFT JOIN
-- 		honin.cfreelike ON honin.cfree.cfnum = honin.cfreelike.cfnum
-- 	GROUP BY
-- 		honin.cfree.cfnum, honin.cfree.title

--     UNION ALL
--     -- canonymous 게시판
--     SELECT
--         'canonymous' AS board_name,
--         canonymous.title AS title,
--         canonymous.canum AS canum,
--         COUNT(canonymouslike.calnum) AS like_count
--     FROM
--         honin.canonymous
--     LEFT JOIN
--         honin.canonymouslike ON honin.canonymous.canum = honin.canonymouslike.canum
--     GROUP BY
--         honin.canonymous.canum, honin.canonymous.title

--     UNION ALL
--     -- crecommended 게시판
--     SELECT
--         'crecommended' AS board_name,
--         crecommended.title AS title,
--         crecommended.crnum AS crnum,
--         COUNT(crecommendedlike.crlnum) AS like_count
--     FROM
--         honin.crecommended
--     LEFT JOIN
--         honin.crecommendedlike ON honin.crecommended.crnum = honin.crecommendedlike.crnum
--     GROUP BY
--         honin.crecommended.crnum, honin.crecommended.title

--     UNION ALL

--     -- ctip 게시판
--     SELECT
--         'ctip' AS board_name,
--         ctip.title AS title,
--         ctip.ctnum AS ctnum,
--         COUNT(ctiplike.ctlnum) AS like_count
--     FROM
--         honin.ctip
--     LEFT JOIN
--         honin.ctiplike ON honin.ctip.ctnum = honin.ctiplike.ctnum
--     GROUP BY
--         honin.ctip.ctnum, honin.ctip.title
-- )

-- SELECT
--     board_name,
--     title,
--     like_count
-- FROM
--     LikeCounts
-- ORDER BY
--     like_count DESC
-- LIMIT 10;
