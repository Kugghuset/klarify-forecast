/*
Updates a factFinancial to db and selects it.
*/

-- Update the factFinancial
UPDATE [dbo].[FactEstimates]
SET
    [Estimated Revenue] = @rev
  , [Estimated Profit] = @pro
  , [Estimated Costs] = @cost
  , [Estimated People Costs] = @people
  , [Estimated Other Costs] = @other
WHERE [PeriodYYYYMM] = @period