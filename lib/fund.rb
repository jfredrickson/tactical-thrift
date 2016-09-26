class Fund < ActiveRecord::Base
  has_many :positions
  validates :name, uniqueness: true
end
