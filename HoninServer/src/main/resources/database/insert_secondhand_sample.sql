-- 예제 데이터를 삽입하기 위해 'secondhand' 테이블에 데이터 삽입
INSERT INTO secondhand (snum, content, price, readcount, seller, state, title, writedate)
VALUES
    (1, 'Item 1 description', 100.00, 50, 'user01', 'Y', 'Item 1', '2024-01-01 10:00:00'),
    (2, 'Item 2 description', 200.00, 30, 'user02', 'Y', 'Item 2', '2024-01-02 11:00:00'),
    (3, 'Item 3 description', 150.00, 20, 'user03', 'Y', 'Item 3', '2024-01-03 12:00:00'),
    (4, 'Item 4 description', 300.00, 40, 'user04', 'Y', 'Item 4', '2024-01-04 13:00:00'),
    (5, 'Item 5 description', 250.00, 10, 'user05', 'Y', 'Item 5', '2024-01-05 14:00:00'),
    (6, 'Item 6 description', 350.00, 60, 'user01', 'Y', 'Item 6', '2024-01-06 15:00:00'),
    (7, 'Item 7 description', 400.00, 70, 'user03', 'Y', 'Item 7', '2024-01-07 16:00:00'),
    (8, 'Item 8 description', 450.00, 80, 'user04', 'Y', 'Item 8', '2024-01-08 17:00:00'),
    (9, 'Item 9 description', 500.00, 90, 'user05', 'Y', 'Item 9', '2024-01-09 18:00:00'),
    (10, 'Item 10 description', 550.00, 100, 'user01', 'Y', 'Item 10', '2024-01-10 19:00:00');

-- 예제 데이터를 삽입하기 위해 'simages' 테이블에 데이터 삽입
INSERT INTO simages (sinum, snum, savefilename)
VALUES
    (1, 1, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (2, 2, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (3, 3, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (4, 4, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (5, 5, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (6, 6, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (7, 7, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (8, 8, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (9, 9, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg'),
    (10, 10, 'F5FAA616-4532-4BB6-97C1-0779662EA3B01722678034984.jpeg');

