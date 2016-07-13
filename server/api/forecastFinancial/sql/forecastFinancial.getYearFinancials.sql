/*
Finds all forecastFinancials for 12 months from @period
*/

SELECT
    [PeriodYYYYMM]
  , [Estimated Revenue]
  , [Estimated Profit]
  , [Estimated Costs]
  , [Estimated People Costs]
  , [Estimated Other Costs]
  , [Date]
FROM [dbo].[FactEstimates]
WHERE PeriodYYYYMM >= @period
ORDER BY PeriodYYYYMM ASC
OFFSET 0 ROWS FETCH NEXT 12 ROWS ONLY