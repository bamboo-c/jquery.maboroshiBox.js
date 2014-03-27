module.exports = (grunt) ->
	pkg = grunt.file.readJSON 'package.json' # パッケージファイルの読み込み
	grunt.initConfig
		dir: # ディレクトリ設定
			src : 'demo'
			dist : 'dist'

		sass: # sassのタスク
			src:
				files: [
					expand: true
					cwd: '<%= dir.src %>/site-assets/scss'
					src: ['{,*/}*.scss']
					dest: '<%= dir.src %>/site-assets/css'
					ext: '.css'
				]

		slim: # slimのタスク
			src:
				files: [
					expand: true
					cwd: '<%= dir.src %>'
					src: ['{,*/}*.slim']
					dest: '<%= dir.src %>'
					ext: '.html'
				]

		prettify: # 出力HTMLのフォーマット
			options:
				"indent": 4
				"condense": true
				"indent_inner_html": true
				"unformatted": [
					"a"
					"pre"
				]
			dist:
				files: [
					expand: true
					cwd: '<%= dir.src %>'
					ext: '.html'
					src: ['*.html']
					dest: '<%= dir.src %>'
				]

		autoprefixer: # ベンダープレフィックス付与設定
			options:
				browsers: [ "last 2 version","ie 8","ie 9" ]
			default:
				src: "<%= dir.src %>/site-assets/css/style.css"
				dest: "<%= autoprefixer.default.src %>"

		csscomb: # CSSのプロパティの順番整理
			default:
				src: "<%= autoprefixer.default.src %>"
				dest: "<%= autoprefixer.default.src %>"

		uglify: # jsの結合と圧縮
			dist:
				files:
					"<%= dir.dist %>/jquery.maboroshiBox.min.js" : "<%= dir.dist %>/jquery.maboroshiBox.js"

		watch: # ファイル更新監視
			sass: # sassの監視
				files: "<%= dir.src %>/site-assets/scss/*.scss"
				tasks: 'sass'

			templates: # slimの監視
				files: '<%= dir.src %>/*.slim'
				tasks: ['slim']

			html: # htmlの監視
				files: "<%= dir.dist %>/*.html"

	# pakage.jsonに記載されているパッケージをオートロード
	for taskName of pkg.devDependencies
		grunt.loadNpmTasks taskName  if taskName.substring(0, 6) is "grunt-"

	# 以下タスクの登録
	# デフォルト（各ファイル監視してビルド）
	grunt.registerTask "default", [
		"watch"
	]

	# リリース用ビルド
	grunt.registerTask "dist", [
		"autoprefixer"
		"csscomb"
		"uglify"
		"prettify"
	]
	return