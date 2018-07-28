import http from 'http'
import fs from 'fs'
import cheerio from 'cheerio'
import { resolve } from 'path';
const baseUrl = 'http://www.imooc.com/learn/'
const url = 'http://www.imooc.com/learn/348'
String.prototype.replaceEmpty = function(){
	return this.replace(/\s+/g, ' ')
}
const filterChapters = (html) => {
	const $ = cheerio.load(html)
	const chapters = $('.chapter')

	const courseData = []

	chapters.each(function(item) {
		let chapter = $(this)
		let chapterTitle = chapter.find('h3').text()
		let videos = chapter.find('.video').children('li')
		let chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}

		videos.each(function(){
			const video = $(this).find('.J-media-item')
			const videoTitle = video.text()
			const id = video.attr('href').split('video/')[1]
			chapterData.videos.push({
			  title: videoTitle,
			  id: id
			})
		  })
		  courseData.push(chapterData)
		})
	return courseData
}

const printCourseInfo = (courseData) => {
	let value = ''
	courseData.forEach(element => {
		let chapterTitle = element.chapterTitle
		value += chapterTitle.replaceEmpty().trim() + '\n'
		element.videos.forEach(video => {
			value += `    ${video.id.replaceEmpty()} ${video.title.replaceEmpty()}` + '\n'
		})
	});
	fs.writeFileSync('./src/index.txt', value)
}
const getPageAsync = url => {
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			let html = ''
			res.on('data', (data) => {
				html += data
			})
		
			res.on('end', () => {
				resolve(html)
				const courseData = filterChapters(html)
				printCourseInfo(courseData)
				fs.writeFileSync('./src/index.html', html)
			})
		}).on('error', (e) => {
			console.log('获取数据出错')
			reject(e)
		})
	})
}
const fetchCourseArray = []

videoIds.forEach(id => {
	fetchCourseArray.push(getPageAsync(baseUrl + id))
})
Promise
	.all(fetchCourseArray)
	.then(pages => {
		let coursesData = []

		pages.forEach(html => {
			let courses = filterChapters(html)
		
			coursesData.push(courses)
		})
	})

