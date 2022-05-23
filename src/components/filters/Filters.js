import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Filters = ({ sortOrder, setSortOrder }) => {
  const filters = [
    {
      name: "Release Date Asc",
      value: "release_date.asc"
    },
    {
      name: "Release Date Desc",
      value: "release_date.desc"
    },
    {
      name: "Alphabetical Asc",
      value: "original_title.asc"
    },
    {
      name: "Alphabetical Desc",
      value: "original_title.desc"
    },
    {
      name: "Rating Asc",
      value: "vote_average.asc"
    },
    {
      name: "Rating Desc",
      value: "vote_average.desc"
    },
  ]

  return (
    <div>
      <Box>
        <FormControl fullWidth>
          <InputLabel>Filter</InputLabel>
          <Select
            value={sortOrder}
            label="Filter"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {filters.map((item, i) => (
              <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default Filters