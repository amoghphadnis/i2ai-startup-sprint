# VC Leaderboard

A comprehensive leaderboard showcasing top venture capital firms across different funding stages.

## Features

- **Funding Stage Filtering**: Filter VCs by funding stages (Pre-Seed, Seed, Series A, B, C, D, E+)
- **Search Functionality**: Search VCs by name, focus area, or location
- **Founder-Driven Rankings**: Sort by Elo ratings, founder ratings, and founder comparison votes
- **Rich VC Information**: Display key metrics including total funds, portfolio companies, unicorns, and success rates
- **Founder Metrics**: Elo ratings, founder comparison counts, and founder ratings from real founder feedback
- **Responsive Design**: Mobile-friendly interface
- **Interactive UI**: Hover effects, animations, and modern styling

## Funding Stages

The leaderboard organizes VCs into the following funding stages:

1. **Pre-Seed**: Early-stage accelerators and investors (Y Combinator, 500 Startups, Techstars)
2. **Seed**: Seed-stage venture capital firms (Sequoia Capital, Andreessen Horowitz, First Round)
3. **Series A**: Series A focused VCs (Kleiner Perkins, Accel, Benchmark)
4. **Series B**: Growth-stage investors (Tiger Global, Insight Partners, General Catalyst)
5. **Series C**: Later-stage growth investors (SoftBank Vision Fund, Coatue, Dragoneer)
6. **Series D**: Private equity and growth firms (Silver Lake, TPG, KKR)
7. **Series E+**: Large private equity firms (Blackstone, Apollo, Carlyle)

## Data Structure

VC data is stored in `src/assets/data/vcs.json` with the following structure:

```json
{
  "vcs": [
    {
      "id": 1,
      "name": "VC Name",
      "logo": "VC",
      "stage": "preseed|seed|series-a|series-b|series-c|series-d|series-e-plus",
      "totalFunds": "$X.XB",
      "portfolioCompanies": 1000,
      "unicorns": 50,
      "avgInvestment": "$XM",
      "focus": "Investment focus areas",
      "location": "City, State/Country",
      "founded": 2000,
      "description": "Brief description",
      "website": "https://vc-website.com",
      "successRate": 95
    }
  ]
}
```

## Adding New VCs

To add a new VC to the leaderboard:

1. Open `src/assets/data/vcs.json`
2. Add a new entry to the `vcs` array
3. Ensure all required fields are populated
4. Use the appropriate `stage` value from the list above
5. Update the total count in the stage filter tabs

## Key Metrics

Each VC displays the following metrics:

- **Total Funds**: Total assets under management
- **Portfolio Companies**: Number of companies in portfolio
- **Unicorns**: Number of unicorn companies (valued at $1B+)
- **Success Rate**: Historical success rate percentage

## Usage

Access the VC leaderboard at `/VC-Leaderboard` route.

## Styling

The component uses custom CSS in `VCLeaderboard.css` with:
- Glassmorphism effects
- Gradient backgrounds
- Hover animations
- Responsive grid layouts
- Color-coded stage filters

## Future Enhancements

- Real-time data integration
- Advanced filtering options
- VC comparison tools
- Investment history tracking
- Geographic filtering
- Industry focus filtering
