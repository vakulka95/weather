import { defineEventHandler } from 'h3'
import cities from '@/public/data/cities_ua.json'

export default defineEventHandler((event) => {
    return cities
})