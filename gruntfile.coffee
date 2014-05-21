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
				options:
					pretty: 'true'
				files: [
					expand: true
					cwd: '<%= dir.src %>'
					src: ['{,*/}*.slim']
					dest: '<%= dir.src %>'
					ext: '.html'
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

		connect: # 簡易サーバー
			uses_defaults: {}

		jshint: # js文法チェック
			options:
				jshintrc: ".jshintrc"
			files: [
				'Gruntfile.js'
				'package.json'
				'<%= dir.dist %>/*.js'
				'!<%= dir.dist %>/*.min.js'
				'.jshintrc'
			]

		uglify: # jsの結合と圧縮
			options:
				preserveComments: 'some'
			dist:
				files:
					"<%= dir.dist %>/jquery.maboroshiBox.min.js" : "<%= dir.dist %>/jquery.maboroshiBox.js"

		watch: # ファイル更新監視
			options: # ライブリロードを有効にする
				livereload: true

			sass: # sassの監視
				files: "<%= dir.src %>/site-assets/scss/*.scss"
				tasks: 'sass'

			templates: # slimの監視
				files: '<%= dir.src %>/*.slim'
				tasks: ['slim']

		yuidoc: #JS ドキュメント作成
			compile:
				name: 'jQuery.maboroshiBox'
				description: 'モーダルウィンドウ表示用プラグイン'
				version: '1.0.0'
				url: 'http://github.com/'
				options:
					paths: 'dist/'
					# themedir: 'path/to/custom/theme/'
					outdir: 'docs/'

	# pakage.jsonに記載されているパッケージをオートロード
	for taskName of pkg.devDependencies
		grunt.loadNpmTasks taskName  if taskName.substring(0, 6) is "grunt-"

	# 以下タスクの登録
	# デフォルト（各ファイル監視してビルド）
	grunt.registerTask "default", [
		"connect"
		"watch"
	]

	# コミット時ビルド
	grunt.registerTask "dist", [
		"autoprefixer"
		"csscomb"
		"jshint"
		"uglify"
	]

	grunt.registerTask "doc", [
		"yuidoc"
	]

	return