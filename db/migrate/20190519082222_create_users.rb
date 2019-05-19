class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: true, comment: '名前'
      t.text :image_data, comment: '画像データの名前'

      t.timestamps
    end
  end
end
