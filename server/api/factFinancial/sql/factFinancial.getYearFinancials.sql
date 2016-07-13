/*
Finds all factFinancials for 12 months from @period
*/

SELECT
    [PeriodYYYYMM]
  , [Revenue]
  , [Profit]
  , [Costs]
  , [People Costs]
  , [Other Costs]
  , [Date]
FROM [dbo].[FactFinancial]
WHERE PeriodYYYYMM >= @period
ORDER BY PeriodYYYYMM ASC
OFFSET 0 ROWS FETCH NEXT 12 ROWS ONLY