# Tactical Thrift

An application that tracks the Thrift Savings Plan's 10-month moving average, and suggests a possible allocation. The key formula is based on Mebane Faber's paper, [*A Quantitative Approach to Tactical Asset Allocation*](http://papers.ssrn.com/sol3/papers.cfm?abstract_id=962461).

## Getting started

This is a [Sinatra](http://www.sinatrarb.com/) app that targets the [Heroku](https://www.heroku.com/) platform, but can run pretty much anywhere else.

To run the app after cloning this repository:

```
bundle install
ENV=development bundle exec rake db:setup
bundle exec shotgun
```

Then open up [http://localhost:9393](http://localhost:9393) in your browser.

You can also have the app download the full TSP price history and compute the model's historical positions by running `bundle exec rake populate_positions`.

## License

Copyright (C) 2016-2020 Jeff Fredrickson

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
