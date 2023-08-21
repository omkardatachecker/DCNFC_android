function Progress_Bar(element) {
    let self = this;
    this.element = element

    this.init_pbar = function (value) {
        self.pbar_end = value
        self.pbar_val = 0
    }
    this.increase_pbar = function () {
        self.pbar_val += 1
        self.element.style.width = self.pbar_val*100/self.pbar_end+'%'
    }
    this.hide_pbar = function () {
        pbar_container.style.display = "None";
    }
}

function MRZ(settings) {
    let self = this;
    this.settings = settings

    this.OCR;

    let country_codes_online = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "AIA", "ATA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BYS", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BVT", "BRA", "GBD", "IOT", "GBN", "GBO", "GBP", "GBS", "VGB", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR", "CAN", "CTE", "CPV", "CYM", "CAF", "TCD", "CHL", "CHN", "CXR", "CCK", "COL", "COM", "COD", "COG", "COK", "CRI", "CIV", "HRV", "CUB", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ATN", "TMP", "ECU", "EGY", "SLV", "ENG", "GNQ", "ERI", "EST", "ETH", "FRO", "FLK", "FJI", "FIN", "FRA", "FXX", "GUF", "PYF", "ATF", "GAB", "GMB", "SGS", "GEO", "DDR", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GLP", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HMD", "HND", "HKG", "BDT", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MKD", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MTQ", "MRT", "MUS", "MYT", "MEX", "FSM", "MDA", "MCO", "MNG", "MSR", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "ANT", "NTZ", "NCL", "NZL", "NIC", "NER", "NGA", "NIU", "NFK", "MNP", "NOR", "OMN", "PAK", "PLW", "PSE", "PAN", "PNG", "PRY", "PER", "PHL", "PCN", "POL", "PRT", "PRI", "QAT", "XXC", "XXB", "REU", "ROM", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SCO", "SEN", "SYC", "SLE", "SGP", "SVK", "SVN", "SLB", "SOM", "ZAF", "ESP", "LKA", "SHN", "KNA", "LCA", "SPM", "VCT", "XXA", "SDN", "SUR", "SJM", "SWZ", "SWE", "CHE", "SYR", "TWN", "TJK", "TZA", "THA", "TGO", "TKL", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "UNA", "UNO", "USA", "VIR", "XXX", "URY", "UMI", "UZB", "VUT", "VAT", "VEN", "VNM", "WAL", "WLF", "ESH", "YEM", "YMD", "YUG", "ZAR", "ZMB", "ZWE"]
    let country_codes_prado = ['AFG', 'AGO', 'AIA', 'ALB', 'AND', 'ARE', 'ARG', 'ARM', 'AUS', 'AUT', 'AZE', 'BDI', 'BEL', 'BEN', 'BFA', 'BGD', 'BGR', 'BHR', 'BHS', 'BIH', 'BLR', 'BLZ', 'BMU', 'BRA', 'BRN', 'BTN', 'BWA', 'CAF', 'CAN', 'CHE', 'CHL', 'CHN', 'CIV', 'CMR', 'COD', 'COG', 'COL', 'COM', 'CPV', 'CRI', 'CUB', 'CYP', 'CZE', 'DEU', 'DJI', 'DMA', 'DNK', 'DOM', 'DZA', 'ECU', 'EGY', 'ERI', 'ESP', 'EST', 'ETH', 'EUE', 'FIN', 'FRA', 'FRO', 'GAB', 'GBD', 'GBR', 'GEO', 'GGY', 'GHA', 'GIB', 'GIN', 'GMB', 'GNB', 'GRC', 'GRD', 'GRL', 'GUY', 'HKG', 'HND', 'HRV', 'HTI', 'HUN', 'IMN', 'IND', 'INT', 'IRL', 'IRN', 'IRQ', 'ISL', 'ISR', 'ITA', 'JAM', 'JEY', 'JOR', 'JPN', 'KAZ', 'KEN', 'KGZ', 'KHM', 'KNA', 'KOR', 'KWT', 'LAO', 'LBN', 'LBR', 'LBY', 'LIE', 'LKA', 'LSO', 'LTU', 'LUX', 'LVA', 'MAC', 'MAR', 'MCO', 'MDA', 'MDG', 'MDV', 'MEX', 'MKD', 'MLI', 'MLT', 'MNE', 'MNG', 'MOZ', 'MRT', 'MSR', 'MWI', 'MYS', 'NAM', 'NCL', 'NGA', 'NIC', 'NLD', 'NOR', 'NPL', 'NZL', 'OMN', 'PAK', 'PAN', 'PER', 'PHL', 'PLW', 'POL', 'PRK', 'PRT', 'PRY', 'PSE', 'PYF', 'QAT', 'RKS', 'ROU', 'RUS', 'RWA', 'SAU', 'SDN', 'SEN', 'SGP', 'SHN', 'SLE', 'SLV', 'SMR', 'SOM', 'SRB', 'SSD', 'STP', 'SVK', 'SVN', 'SWE', 'SYC', 'SYR', 'TCA', 'TCD', 'TGO', 'THA', 'TKM', 'TLS', 'TUN', 'TUR', 'TUV', 'TWN', 'TZA', 'UAP', 'UGA', 'UKR', 'UNO', 'URY', 'USA', 'UTO', 'UZB', 'VAT', 'VEN', 'VGB', 'VNM', 'XEC', 'XOM', 'XPO', 'YEM', 'ZAF', 'ZMB', 'ZWE']
    let country_codes_icao = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "AIA", "ATA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BVT", "BRA", "IOT", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR", "CAN", "CPV", "CYM", "CAF", "TCD", "CHL", "CHN", "CXR", "CCK", "COL", "COM", "COG", "COK", "CRI", "CIV", "HRV", "CUB", "CYP", "CZE", "PRK", "COD", "DNK", "DJI", "DMA", "DOM", "TMP", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "ETH", "FLK", "FRO", "FJI", "FIN", "FRA", "FXX", "GUF", "PYF", "GAB", "GMB", "GEO", "D<<", "GHA", "GIB", "GRC", "GRL", "GRD", "GLP", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HMD", "VAT", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MTQ", "MRT", "MUS", "MYT", "MEX", "FSM", "MCO", "MNG", "MSR", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "ANT", "NTZ", "NCL", "NZL", "NIC", "NER", "NGA", "NIU", "NFK", "MNP", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "PCN", "POL", "PRT", "PRI", "QAT", "KOR", "MDA", "REU", "ROM", "RUS", "RWA", "SHN", "KNA", "LCA", "SPM", "VCT", "WSM", "SMR", "STP", "SAU", "SEN", "SYC", "SLE", "SGP", "SVK", "SVN", "SLB", "SOM", "ZAF", "SGS", "ESP", "LKA", "SDN", "SUR", "SJM", "SWZ", "SWE", "CHE", "SYR", "TWN", "TJK", "THA", "MKD", "TGO", "TKL", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "GBD", "GBN", "GBO", "GBP", "GBS", "TZA", "USA", "UMI", "URY", "UZB", "VUT", "VEN", "VNM", "VGB", "VIR", "WLF", "ESH", "YEM", "ZAR", "ZMB", "ZWE", "UNO", "UNA", "XXA", "XXB", "XXC", "XXX", "VGB", "HKG", "MAC", "PSE", "SCG", "TLS"]
    let country_codes = new Set() // BDR
    // country_codes_online.forEach(item => country_codes.add(item))
    // country_codes_prado.forEach(item => country_codes.add(item))
    country_codes_icao = country_codes_icao.forEach((item) => {
        item = item.padEnd(3, "<")
        country_codes.add(item)
    })

    this.country_codes = [...country_codes]
    // this.rgx_country_codes = `(?:${self.country_codes.join('|')})`
    // this.rgx_country_codes = "(?:A(?:BW|FG|GO|IA|LB|N[DT]|R[EGM]|SM|T[AFGN]|U[ST]|ZE)|B(?:D[IT]|E[LN]|FA|G[DR]|H[RS]|IH|L[RZ]|MU|OL|R[ABN]|TN|VT|WA|YS)|C(?:A[FN]|CK|H[ELN]|IV|MR|O[DGKLM]|PV|RI|TE|UB|XR|Y[MP]|ZE)|D(?:DR|EU|JI|MA|NK|OM|ZA)|E(?:CU|GY|NG|RI|S[HPT]|TH|UE)|F(?:IN|JI|LK|R[AO]|SM|XX)|G(?:AB|B[DNOPRS]|EO|GY|HA|I[BN]|LP|MB|N[BQ]|R[CDL]|TM|U[FMY])|H(?:KG|MD|ND|RV|TI|UN)|I(?:DN|MN|N[DT]|OT|R[LNQ]|S[LR]|TA)|J(?:AM|EY|OR|PN)|K(?:AZ|EN|GZ|HM|IR|NA|OR|WT)|L(?:AO|B[NRY]|CA|IE|KA|SO|TU|UX|VA)|M(?:A[CR]|CO|D[AGV]|EX|HL|KD|L[IT]|MR|N[EGP]|OZ|RT|SR|TQ|US|WI|Y[ST])|N(?:AM|CL|ER|FK|GA|I[CU]|LD|OR|PL|RU|TZ|ZL)|OMN|P(?:A[KN]|CN|ER|HL|LW|NG|OL|R[IKTY]|SE|YF)|QAT|R(?:EU|KS|O[MU]|US|WA)|S(?:AU|CO|DN|EN|G[PS]|HN|JM|L[BEV]|MR|OM|PM|RB|SD|TP|UR|V[KN]|W[EZ]|Y[CR])|T(?:C[AD]|GO|HA|JK|K[LM]|LS|MP|ON|TO|U[NRV]|WN|ZA)|U(?:AP|GA|KR|MI|N[AO]|RY|SA|TO|ZB)|V(?:AT|CT|EN|GB|IR|NM|UT)|W(?:AL|LF|SM)|X(?:EC|OM|PO|X[ABCX])|Y(?:EM|MD|UG)|Z(?:A[FR]|MB|WE))"
    this.rgx_country_codes = "(?:A(?:BW|FG|GO|IA|LB|N[DT]|R[EGM]|SM|T[AG]|U[ST]|ZE)|B(?:D[IR]|E[LN]|FA|G[DR]|H[RS]|IH|L[RZ]|MU|OL|R[ABN]|TN|VT|WA)|C(?:A[FN]|CK|H[ELN]|IV|MR|O[DGKLM]|PV|RI|UB|XR|Y[MP]|ZE)|D(?:<<|JI|MA|NK|OM|ZA)|E(?:CU|GY|RI|S[HPT]|TH)|F(?:IN|JI|LK|R[AO]|SM|XX)|G(?:AB|B[DNOPRS]|EO|HA|I[BN]|LP|MB|N[BQ]|R[CDL]|TM|U[FMY])|H(?:KG|MD|ND|RV|TI|UN)|I(?:DN|ND|OT|R[LNQ]|S[LR]|TA)|J(?:AM|OR|PN)|K(?:AZ|EN|GZ|HM|IR|NA|OR|WT)|L(?:AO|B[NRY]|CA|IE|KA|SO|TU|UX|VA)|M(?:A[CR]|CO|D[AGV]|EX|HL|KD|L[IT]|MR|N[GP]|OZ|RT|SR|TQ|US|WI|Y[ST])|N(?:AM|CL|ER|FK|GA|I[CU]|LD|OR|PL|RU|TZ|ZL)|OMN|P(?:A[KN]|CN|ER|HL|LW|NG|OL|R[IKTY]|SE|YF)|QAT|R(?:EU|OM|US|WA)|S(?:AU|CG|DN|EN|G[PS]|HN|JM|L[BEV]|MR|OM|PM|TP|UR|V[KN]|W[EZ]|Y[CR])|T(?:C[AD]|GO|HA|JK|K[LM]|LS|MP|ON|TO|U[NRV]|WN|ZA)|U(?:GA|KR|MI|N[AO]|RY|SA|TO|ZB)|V(?:AT|CT|EN|GB|IR|NM|UT)|W(?:LF|SM)|XX[ABCX]|YEM|Z(?:A[FR]|MB|WE))"
    
    this.misc_values = ["I", "A", "C", "T", "P", "D"]
    this.rgx_misc_values = `(?:${self.misc_values.join('|')})`
    this.nld_subtypes = ["T", "R", "W", "<"]
    this.nld_optional = ["I", "II", "III", "IV", "V", "50", "EU", "FM", "O", "W"]

    this.CHECK_CODES = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29, 'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35, '<': 0}

    this.load_script = async function (src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    this.load = async function (location) {
        options = {
            workerPath: self.settings.MODELS_PATH+'ocr/@4.0.2/custom_worker.min.js',
            langPath: self.settings.MODELS_PATH+'ocr/models',
            // langPath: 'https://127.0.0.1:8080/',
            gzip: false,
            // corePath: 'model/ocr/@4.0.2/tesseract-core-simd.wasm.js',
            corePath: self.settings.MODELS_PATH+'ocr/@4.0.2/tesseract-core.wasm.js',
            // logger: m => console.log(m),
        }
        if (location == 'fetch') {
            delete options.workerPath
            delete options.corePath
        }
        const worker = await Tesseract.createWorker(options);
        await worker.loadLanguage('mrz');
        await worker.initialize('mrz');
        await worker.setParameters({
            tessedit_pageseg_mode: Tesseract.PSM_SINGLE_BLOCK
        });
        return worker
    }

    this.set_regex = function () {
        let td1 = "(?<type>MISC_VALUES)(?<subtype>[A-Z<]{1})(?<country>COUNTRY_CODES)(?<number>[0-9A-Z<]{9})(?<check_digit_document_number>[0-9<]{1})(?<complement>[0-9A-Z<]{14,})\n(?<date_of_birth>[0-9]{6})(?<check_digit_date_of_birth>[0-9]{1})(?<sex>[MF<]{1})(?<expiration_date>[0-9]{6})(?<check_digit_expiration_date>[0-9]{1})(?<nationality>COUNTRY_CODES)(?<optional>[A-Z0-9<]{11,})(?<check_digit_composite>[0-9]{1})\n(?<lname>[A-Z]+)(?<lname_complement>[A-Z<]*)(?=(?:<<))(?:<<)(?<fname>[A-Z]+)(?<fname_complement>[A-Z<]+){0,}"     
        let td2 = "(?<type>MISC_VALUES)(?<subtype>[A-Z<]{1})(?<country>COUNTRY_CODES)(?<lname>[A-Z]+)(?<lname_complement>[A-Z<]*)(?=(?:<<))(?:<<)(?<fname>[A-Z]+)(?<fname_complement>[A-Z<]+){0,}\n(?<number>[0-9A-Z<]{9})(?<check_digit_document_number>[0-9]{1})(?<nationality>COUNTRY_CODES)(?<date_of_birth>[0-9]{6})(?<check_digit_date_of_birth>[0-9]{1})(?<sex>[MF]{1})(?<expiration_date>[0-9]{6})(?<check_digit_expiration_date>[0-9]{1})(?<complement>[0-9A-Z<]{0,})"
        let td2_fra = "(?<type>(?:I))(?<subtype>[A-Z<]{1})(?<country>(?:FRA))(?<lname>[A-Z]+)(?<lname_complement>[A-Z<]+){0,}\n(?<number>[0-9A-Z<]{12})(?<check_digit_document_number>[0-9<]{1})(?<fname>[A-Z]+)(?<fname_complement>[A-Z<]+){0,}(?<date_of_birth>[0-9]{6})(?<check_digit_date_of_birth>[0-9]{1})(?<sex>[MF]{1})(?<check_digit_composite>[0-9]{1})"
        let td3 = "(?<type>MISC_VALUES)(?<subtype>[A-Z<]{1})(?<country>COUNTRY_CODES)(?<lname>[A-Z]+)(?<lname_complement>[A-Z<]*)(?=(?:<<))(?:<<)(?<fname>[A-Z]+)(?<fname_complement>[A-Z<]+){0,}\n(?<number>[0-9A-Z<]{9})(?<check_digit_document_number>[0-9]{1})(?<nationality>COUNTRY_CODES)(?<date_of_birth>[0-9]{6})(?<check_digit_date_of_birth>[0-9]{1})(?<sex>[MF]{1})(?<expiration_date>[0-9]{6})(?<check_digit_expiration_date>[0-9]{1})(?<complement>[0-9A-Z<]{15,})"
        let edl = "(?<type>D)(?<bap>(?:1|<))(?<country>NLD)(?<version>[0-9a-zA-Z<]{1})(?<number>[0-9]{10})(?<complement>[0-9a-zA-Z<]{13})(?<check_digit_composite>[0-9]{1})"

        td1 = td1.replaceAll("COUNTRY_CODES", self.rgx_country_codes)
        td1 = td1.replaceAll("MISC_VALUES", self.rgx_misc_values)
        td2 = td2.replaceAll("COUNTRY_CODES", self.rgx_country_codes)
        td2 = td2.replaceAll("MISC_VALUES", self.rgx_misc_values)
        td3 = td3.replaceAll("COUNTRY_CODES", self.rgx_country_codes)
        td3 = td3.replaceAll("MISC_VALUES", self.rgx_misc_values)

        self.td1 = td1.split('\n')
        self.td2 = td2.split('\n')
        self.td2_fra = td2_fra.split('\n')
        self.td3 = td3.split('\n')
        self.edl = edl.split('\n')
    }

    this.create_worker = async function (scheduler) {
        const worker = await self.load()
        scheduler.addWorker(worker);
    }

    this.init = async function () {
        self.set_regex();
        if (self.settings.MRZ_SETTINGS.OCR) {
            if (typeof Tesseract == 'undefined') {
                await self.load_script(self.settings.MODELS_PATH+'ocr/@4.0.2/tesseract.min.js')
            }
            const scheduler = Tesseract.createScheduler();
            // const worker1 = await self.load()
            // scheduler.addWorker(worker1);
            // const worker2 = await self.load()
            // scheduler.addWorker(worker2);
            await Promise.all([self.create_worker(scheduler), self.create_worker(scheduler)])
            self.scheduler = scheduler
        }
    }

    this.terminate = async function () {
        if (self.settings.MRZ_SETTINGS.OCR) {
            // await self.OCR.terminate();
            await self.scheduler.terminate();
        }
    }

    this.mrz_scanner = async function(image) {
        // const { data: { text } } = await self.OCR.recognize(image);
        const { data: { text } } = await self.scheduler.addJob('recognize', image);

        return text
    }

    this.validate_fields = function (fields) {
        function validate(field, lookup) {
            return lookup.includes(field)
        }

        if (!validate(fields.type, self.misc_values)){
            return {'success': false, 'stage': 'parse'}
        }
        
        if (!validate(fields.country, self.country_codes)) {
            return {'success': false, 'stage': 'validate'}
        }

        if (!validate(fields.nationality, self.country_codes)) {
            return {'success': false, 'stage': 'validate'}
        }

        if ("NLD" == fields.country & "I" == fields.type) {
            // validate subtype for Dutch Residence permit
            if (!validate(fields.subtype, self.nld_subtypes)) {
                return {'success': false, 'stage': 'validate'}
            }
            // validate optional field for Dutch Residence permit
            if (!("<"==fields.subtype)) {
                if (!validate(fields.optional, self.nld_optional)) {
                    return {'success': false, 'stage': 'validate'}
                }
            }
        }

        return {'success':true, 'mrz': fields, 'stage': 'validate'}
    }

    this.parse_regex = function (lines, format) {
        rgxs = self[format]
        let length = lines.length
        let j = 0
        let groups = {}
        let prev_length; let new_lines = [];
        for (let i=0; i < length; i++) {
            if (j >= rgxs.length) {
                return false
            }
            text = lines[i]
            rgx = new RegExp(rgxs[j])

            found = text.match(rgx)
            if (found) {
                found.input = found[0]
                input_length = found.input.length
                new_lines.push(found.input)

                if (prev_length === undefined) {
                    prev_length = input_length
                } else {
                    if (prev_length != input_length) {
                        return false
                    }
                }
                groups = {...groups, ...found.groups}
                j++
            }
        }
        if (j==rgxs.length && found) {
            groups.mrz_type = format.slice(0,3)
            groups.raw_mrz = new_lines
            return {groups: groups}
        } else {
            return false
        }
    }

    this.parse = function (text) {
        text = text.replace(/[ \t]+/g, '')
        text = text.replace(/\n+/, "\n")
        text = text.replace(/\n+$/, "")
        let lines = text.split('\n')
        lines = lines.filter(item => (item.length >= 30));
        
        // Equal lines check
        if (lines.every( (val) => val.length === lines[0].length )) {
            text = lines.join('\n')
        } else {
            lines = []
        }

        text = lines.join('\n')
        if (text.length) {
            let found;

            if (lines.length >= 3 && lines[0].length >= 28 && lines.length >= 3) {
                found = self.parse_regex(lines, 'td1')
            }

            if (!found && lines[0].length >= 42 && lines.length >=2) {
                found = self.parse_regex(lines, 'td3')
            } 


            if (!found && lines[0].length >= 34 && lines.length >= 2) {
                found = self.parse_regex(lines, 'td2')
            }

            if (!found && lines[0].length >= 34 && lines.length >= 2) {
                found = self.parse_regex(lines, 'td2_fra')
            }

            if (!found && lines[0].length >= 30) {
                found = self.parse_regex(lines, 'edl')
            }
            

            if (found) {
                const fields = (({ type, subtype, nationality, country, optional}) => ({ type, subtype, nationality, country, optional}))(found.groups);
                if (fields.optional) {
                    fields.optional = fields.optional.slice(0,4).replaceAll('<', '')
                } else {
                    delete fields.optional
                }

                let valid = self.validate_fields(fields)  // return

                let mrz_type = found.groups.mrz_type
                if (mrz_type == "td1") {
                    found = self.parse_td1(found)
                } else if (mrz_type == "td2") {
                    found = self.parse_td2(found)
                    valid.success = found.groups.valid_score == 100
                } else if (mrz_type == "td3") {
                    found = self.parse_td3(found)
                } else if (mrz_type == "edl") {
                    found = self.parse_edl(found)
                    valid.success = true
                } else {
                    throw mrz_type +'notimplemented'
                }
                valid.success = true
                found = self.format_output(found)
                valid.mrz = found.groups
                return valid
            }   
            return {'success': false, 'stage': 'parse'}
        }
        return {'success': false, 'stage': 'length'}
    }

    this.sum = function (arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return sum;
    }

    this.MRZCheckDigit = function(txt) {
        let CHECK_WEIGHTS = [7, 3, 1]
        if (txt == "") {
            return txt
        }
        let res = 0;
        for (let i = 0; i < txt.length; i++) {
            const c = txt[i];
            const codeVal = (c in self.CHECK_CODES)?self.CHECK_CODES[c]: -1000; // Get the value of the check code, or -1000 if it's not found
            res += codeVal * CHECK_WEIGHTS[i % 3]; // Add the weighted value to the result
          }
          if (res < 0) {
            return "";
          } else {
            return String(res % 10);
          }
    }

    this.MRZCheckDigitPRT = function(txt) {
        let CHECK_WEIGHTS = [2, 1]
        if (txt == "") {
            return txt
        }
        let res = 0;
        for (let i = 0; i < txt.length; i++) {
            const c = txt[i];
            const codeVal = (c in self.CHECK_CODES)?self.CHECK_CODES[c]: -1000; // Get the value of the check code, or -1000 if it's not found
            let code = codeVal * CHECK_WEIGHTS[i % 2]; // Add the weighted value to the result
            if (!(i%2)) {
                if (code >= 10) {
                    code -= 9
                }
            }
            res += code
          }
          if (res < 0) {
            return "";
          } else {
            return String(res % 10);
          }
    }

    this.MRZCheckDigitBEL_PN = function(txt) {
        if (txt == "") {
            return false
        }

        let personal_number = txt.slice(0,-2)
        let check_digit_personal_number = int(txt.slice(-2))
        let result = 97-(parseInt(personal_number)%97)

        // millenial bug
        if (result !== check_digit_personal_number) {
            result = 97-(parseInt('2'+personal_number)%97)
        }
        return result == check_digit_personal_number
    }

    this._check_date = function (ymd) {
        if (ymd.length !== 6) {
            return false
        }
        // validFormats = ["YYMMDD", "YY<<<<"];

        const year = parseInt(ymd.substring(0, 2));
        let month = ymd.substring(2, 4)
        if (month == '<<') {
            month = '01'
        }
        month = parseInt(month) - 1;
        let day = ymd.substring(4, 6)
        if (day == '<<') {
            day = '01'
        }
        day = parseInt(day);
        const fullYear = year >= 50 ? 1900 + year : 2000 + year;
        const date = new Date(fullYear, month, day);

        if (
            date.getFullYear() === fullYear &&
            date.getMonth() === month &&
            date.getDate() === day
        ) {
            return true;
        }

        return false;
      }
    
    this.parse_td1 = function (found) {
        let groups = found.groups
        let lines = groups.raw_mrz
        let [a, b, c] = lines

        let len_a = a.length
        let len_b = b.length
        let len_c = c.length
        if (len_a < 30) {
            a = a + "<" * (30 - len_a)
        }
        if (len_b < 30) {
            b = b + "<" * (30 - len_b)
        }
        if (len_c < 30) {
            c = c + "<" * (30 - len_c)
        }

        if (groups.lname) {
            groups.lname = groups.lname.replaceAll("<", "")
        }
        if (groups.lname_complement) {
            groups.lname_complement = groups.lname_complement.replaceAll("<", " ").trim()
        }
        if (groups.fname_complement) {
            groups.fname_complement = groups.fname_complement.replaceAll("<", " ").trim()
        }
        

        if (groups.country == "NLD") {
            groups.number = groups.number.replaceAll('o', '0').replaceAll('O', '0')
            a = a.slice(0,5) + groups.number + a.slice(14)
            lines[0] = a
            groups.personal_number = a.slice(15,24)
            groups.check_digit_personal_number = a[29]

            // dutch resident permit
            if (groups.type == "I" && groups.subtype !== "D") {
                groups.personal_number = ""
            }
        }
        else if(groups.country == "BEL") {
            groups.personal_number = b.slice(18,29)
            groups.check_digit_personal_number = groups.personal_number.slice(0, -2)
            if (groups.check_digit_document_number == '<') {
                extended = a.slice(15,19).replace(/<+$/, "")
                groups.number = groups.number + extended.slice(0,-1)
                groups.check_digit_document_number = extended[extended.length-1]
            }
        }
        else if (groups.country == "ESP") {
            groups.number = groups.number.slice(3).replaceAll('0', 'O') + groups.number.slice(3)
            a = a.slice(5) + groups.number + a.slice(14)
            lines[0] = a
        }

        let valid_check_digits = [
            self.MRZCheckDigit(groups.number) == groups.check_digit_document_number,
            self.MRZCheckDigit(groups.date_of_birth) == groups.check_digit_date_of_birth
            && self._check_date(groups.date_of_birth),
            self.MRZCheckDigit(groups.expiration_date) == groups.check_digit_expiration_date
            && self._check_date(groups.expiration_date),
            self.MRZCheckDigit(a.slice(5,30) + b.slice(0,7) + b.slice(8,15) + b.slice(18,29))
            == groups.check_digit_composite
        ]

        if (!valid_check_digits[0]) {
            if (groups.country == "PRT") {
                groups.number = a.slice(5,14)+a.slice(15,18)
                groups.check_digit_document_number = '0'
                valid_check_digits[0] = self.MRZCheckDigitPRT(groups.number) == groups.check_digit_document_number
            }
            else if ( groups.country == "BEL") {
                extended = a.slice(15,19).replace(/<+$/, "")
                number = a.slice(5,14) + '0' + extended.slice(0,-1)
                groups.check_digit_document_number = extended[extended.length-1]
                valid_check_digits[0] = self.MRZCheckDigit(number) == groups.check_digit_document_number
            }
        }

        let valid_line_lengths = [len_a == 30, len_b == 30, len_c == 30]
        let valid_misc = ["IAC".includes(groups.type)]
        if (groups.country == "UKR") {
            valid_misc = ["IACT".includes(groups.type)]
            if (groups.type == "T") {
                groups.type == "I"
            }
        }

        let valid_score = (
            10 * self.sum(valid_check_digits)
            + self.sum(valid_line_lengths)
            + self.sum(valid_misc)
            + 1
        )
        valid_score = Math.floor(100 * valid_score / (40 + 3 + 1 + 1))
        let [
            valid_number,
            valid_date_of_birth,
            valid_expiration_date,
            valid_composite
        ] = valid_check_digits

        if (groups.country == "NLD") {
            if (
                groups.type == "I<"
                || groups.type == "i<"
                || groups.type == "ID"
                || groups.type == "IO"
            ) {
                groups.valid_personal_number = (
                    MRZCheckDigit(groups.personal_number)
                    == groups.check_digit_personal_number
                )
                // if not self.valid_personal_number:
                //     self.valid_score -= 10
            }
        }
        else if (groups.country == "BEL") {
            if (
                groups.type == "I<"
                || groups.type == "i<"
                || groups.type == "ID"
                || groups.type == "IO"
            ) {
                groups.valid_personal_number = (
                    MRZCheckDigitBEL_PN(groups.personal_number)
                )
                if (!groups.valid_personal_number) {
                    valid_score -= 10
                }
            }
        }  

        groups.valid_number = valid_number
        groups.valid_date_of_birth = valid_date_of_birth
        groups.valid_expiration_date = valid_expiration_date
        groups.valid_composite = valid_composite
        groups.valid_misc = valid_misc[0]
        groups.valid_score = valid_score
        groups.raw_mrz = lines
        found.groups = groups
        return found
    }

    this.parse_td2 = function (found) {
        let groups = found.groups
        let lines = groups.raw_mrz
        let [a, b] = lines
        let len_a = a.length
        let len_b = b.length
        if (len_a < 36) {
            a = a + "<" * (36 - len_a)
        }
        if (len_b < 36) {
            b = b + "<" * (36 - len_b)
        }
        
        if (groups.lname) {
            groups.lname = groups.lname.replaceAll("<", "")
        }
        if (groups.lname_complement) {
            groups.lname_complement = groups.lname_complement.replaceAll("<", " ").trim()
        }
        if (groups.fname_complement) {
            groups.fname_complement = groups.fname_complement.replaceAll("<", " ").trim()
        }

        if (groups.country == "NLD") {
            let number = b.slice(0,9)
            number = number.replaceAll('o', '0').replaceAll('O', '0')
            b = number + b.slice(9)
            lines[1] = b
            groups.number = number
        }


        groups.check_digit_composite = b[35]
        let valid_check_digits;

        if (groups.country == 'FRA') {
            groups.number = b.slice(0,12)
            groups.names = b.slice(13,27).replaceAll("<", " ").trim()
            groups.check_digit_document_number = b[12]
            groups.nationality = a.slice(2,5)
            groups.date_of_birth = b.slice(27,33)
            groups.check_digit_date_of_birth = b[33]
            groups.sex = b[34]
            groups.expiration_date = ''           

            let creationDate = new Date(b.slice(0, 2), b.slice(2,4), '01');
            let year = String(creationDate.getFullYear() + 10)
            groups.expiration_date = year.slice(2,4)+ b.slice(2,4)+'01'

            valid_check_digits = [
                self.MRZCheckDigit(groups.number) == groups.check_digit_document_number,
                self.MRZCheckDigit(groups.date_of_birth) == groups.check_digit_date_of_birth
                && self._check_date(groups.date_of_birth),
                true,
                self.MRZCheckDigit(a + b.slice(0,-1))
                == groups.check_digit_composite
            ]
        } else {
            valid_check_digits = [
                self.MRZCheckDigit(groups.number) == groups.check_digit_document_number,
                self.MRZCheckDigit(groups.date_of_birth) == groups.check_digit_date_of_birth
                && self._check_date(groups.date_of_birth),
                self.MRZCheckDigit(groups.expiration_date) == groups.check_digit_expiration_date
                && self._check_date(groups.expiration_date),
                self.MRZCheckDigit(b.slice(0,10) + b.slice(13,20) + b.slice(21,35))
                == groups.check_digit_composite
            ]
        }

        let valid_line_lengths = [len_a == 36, len_b == 36]
        let valid_misc = ["ACI".includes(groups.type)]
        let valid_score = (
            10 * self.sum(valid_check_digits)
            + self.sum(valid_line_lengths)
            + self.sum(valid_misc)
            + 1
        )
        valid_score = Math.floor(100 * valid_score / (40 + 2 + 1 + 1))
        let [
            valid_number,
            valid_date_of_birth,
            valid_expiration_date,
            valid_composite
        ] = valid_check_digits

        groups.valid_number = valid_number
        groups.valid_date_of_birth = valid_date_of_birth
        groups.valid_expiration_date = valid_expiration_date
        groups.valid_composite = valid_composite
        groups.valid_misc = valid_misc[0]
        groups.valid_score = valid_score
        groups.raw_mrz = lines
        found.groups = groups
        return found
    }

    this.parse_td3 = function (found) {
        let groups = found.groups
        let lines = groups.raw_mrz
        let [a, b] = lines
        let len_a = a.length
        let len_b = b.length
        if (len_a < 44) {
            a = a + "<" * (44 - len_a)
        }
        if (len_b < 44) {
            b = b + "<" * (44 - len_b)
        }
        
        if (groups.lname) {
            groups.lname = groups.lname.replaceAll("<", "")
        }
        if (groups.lname_complement) {
            groups.lname_complement = groups.lname_complement.replaceAll("<", " ").trim()
        }
        if (groups.fname_complement) {
            groups.fname_complement = groups.fname_complement.replaceAll("<", " ").trim()
        }

        if (groups.country == "NLD") {
            let number = b.slice(0,9)
            number = number.replaceAll('o', '0').replaceAll('O', '0')
            b = number + b.slice(9)
            lines[1] = b
            groups.number = number
        }

        groups.check_digit_composite = b[43]
        groups.personal_number = b.slice(28,42)
        groups.check_digit_personal_number= b[42]

        let valid_check_digits = [
            self.MRZCheckDigit(groups.number) == groups.check_digit_document_number,
            self.MRZCheckDigit(groups.date_of_birth) == groups.check_digit_date_of_birth
            && self._check_date(groups.date_of_birth),
            self.MRZCheckDigit(groups.expiration_date) == groups.check_digit_expiration_date
            && self._check_date(groups.expiration_date),
            self.MRZCheckDigit(b.slice(0,10) + b.slice(13,20) + b.slice(21,43))
            == groups.check_digit_composite,
            (
                (groups.check_digit_personal_number == "<" || groups.check_digit_personal_number == "0")
                && groups.personal_number == "<<<<<<<<<<<<<<"
            )  // PN is optional
            || self.MRZCheckDigit(groups.personal_number)
            == groups.check_digit_personal_number,
        ]
        let valid_line_lengths = [len_a == 44, len_b == 44]
        let valid_misc = [groups.type == "P"]
        let valid_score = (
            10 * self.sum(valid_check_digits)
            + self.sum(valid_line_lengths)
            + self.sum(valid_misc)
            + 1
        )
        valid_score = Math.floor(100 * valid_score / (50 + 2 + 1 + 1))
        let [
            valid_number,
            valid_date_of_birth,
            valid_expiration_date,
            valid_composite,
            valid_personal_number 
        ] = valid_check_digits

        groups.personal_number = groups.personal_number.replaceAll("<", "")

        groups.valid_number = valid_number
        groups.valid_date_of_birth = valid_date_of_birth
        groups.valid_expiration_date = valid_expiration_date
        groups.valid_personal_number = valid_personal_number
        groups.valid_composite = valid_composite
        groups.valid_misc = valid_misc[0]
        groups.valid_score = valid_score
        groups.raw_mrz = lines
        found.groups = groups
        return found
    }

    this.parse_edl = function (found) {
        let groups = found.groups
        let lines = groups.raw_mrz
        let [a] = lines
        let len_a = a.length
        if (len_a < 30) {
            a = a + "<" * (30 - len_a)
        }

        let valid_check_digits = [
            self.MRZCheckDigit(a.slice(0,29)) == groups.check_digit_composite,
        ]
        let valid_line_lengths = [len_a == 30]
        let valid_misc = [groups.type == "D"]
        let valid_score = (
            10 * self.sum(valid_check_digits)
            + self.sum(valid_line_lengths)
            + self.sum(valid_misc)
            + 1
        )
        valid_score = Math.floor(100 * valid_score / (10 + 1 + 1 + 1))
        let [
            valid_composite,
        ] = valid_check_digits


        groups.valid_composite = valid_composite
        groups.valid_misc = valid_misc[0]
        groups.valid_score = valid_score
        groups.raw_mrz = lines

        found.groups = groups
        return found
    }

    this.format_output = function (found) {
        function format_date(groups, id) {
            if (groups["valid_"+id]) {
                let dob = groups[id]
                let year = parseInt(dob.slice(0, 2))
                const fullYear = year >= 50 ? 1900 + year : 2000 + year;
                const month = parseInt(dob.slice(2,4))-1
                const day = parseInt(dob.slice(4,6))
                let dob_obj = new Date(fullYear, month, day);
                groups[id] = dob_obj.getFullYear()+'-'+('0'+(dob_obj.getMonth()+1)).slice(-2)+'-'+('0'+dob_obj.getDate()).slice(-2)
            }
            return groups
        }
        let groups = found.groups

        // Date formatting
        groups = format_date(groups, 'date_of_birth')
        groups = format_date(groups, 'expiration_date')

        // Misc
        groups.misc = groups.type
        let type = groups.type
        if (type == "I") {
            let subtype = groups.subtype
            if (subtype == "T" || subtype == "R" || subtype == "W") {
                type = "IT"
            } else {
                type = "ID"
            }
        } else if (type == "P") {
            type = "PASSPORT"
        }
        groups.type = type

        // Names
        if (groups.fname || groups.lname) {
            groups.names = ([groups.fname,groups.fname_complement].join(" ")).replaceAll('<').trim()
            groups.surname = ([groups.lname, groups.lname_complement].join(" ")).replaceAll('<').trim()
        }

        found.groups = groups
        return found
    }

    this.find_mrz_sync = async function (rois, id='cardImg') {
        let cardImg = document.getElementById(id);
        cardImg.style.display = "none"
        let found = {"success": false}
        if (rois.length) {
            for (let i=0; i<rois.length; i++) {
                cardImg.src = rois[i].img
                let text = await self.mrz_scanner(cardImg)

                found = self.parse(text)

                // console.log(found)

                if (found.success) {
                    found.mrz['angle'] = rois[i].angle
                    // self.terminate();
                    break
                }
            }
            
        }
        return found
    }

    this.find_mrz_async = async function (rois, id='cardImg') { 
        let found = {"success": false}
        if (rois.length) {
            let cardImg1 = document.getElementById(id);
            cardImg1.style.display = "none"
            cardImg1.src = rois[0].img
            let cardImg2 = document.getElementById(id+'2');
            cardImg2.style.display = "none"
            cardImg2.src = rois[1].img
            const results = await Promise.all([self.mrz_scanner(cardImg1), self.mrz_scanner(cardImg2)])
            // console.log(results)
            for (let i=0; i<results.length; i++) {
                let text = results[i]
                found = self.parse(text)

                // console.log(found)

                if (found.success) {
                    found.mrz['angle'] = rois[i].angle
                    // self.terminate();
                    break
                }
            }
            
        }
        return found
    }
}

function GlareSegmentation(settings) {
    let self = this;
    this.settings = settings

    this.load_script = async function (src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    this.preprocess = function(src) {
        let dst = new cv.Mat();
        cv.resize(src, dst, new cv.Size(128, 128), 0, 0, cv.INTER_LINEAR)
        cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
        cv.cvtColor(dst, dst, cv.COLOR_BGR2RGB, 0);

        var tensor = nj.float32(dst.data);
        tensor = tensor.divide(255).reshape([1, dst.cols, dst.rows, 3])
        tensor = tensor.transpose(0, 3, 1, 2)

        dst.delete();
        return tensor
    }
    
    this.load_model_onnx = async function() {
        let model;
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        if (typeof ort == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/onnx/ort.wasm.min.js`)
        }

        // model = await ort.InferenceSession.create(self.settings.MODELS_PATH+'glare_seg/onnx/model.onnx', { executionProviders: ['wasm'] });
        model = await ort.InferenceSession.create(self.settings.MODELS_PATH+'glare_seg/onnx/model.ort', { executionProviders: ['wasm', 'cpu'] });
        self.infer = async function(src) {
            let tensor = self.preprocess(src)
            const tensorA = new ort.Tensor("float32", tensor.flatten().tolist(), tensor.shape);
            const feeds = { [self.model.inputNames[0]]: tensorA };
            const results  = await self.model.run(feeds);
            const output = results[Object.keys(results)[0]].data;
            const numberArray = Array.from(output, Number);

            return numberArray
        }
        
        self.model = model
    }

    this.load_model = async function() {
        let model;
        if (typeof tf == 'undefined') {
            // await self.load_script(`${self.settings.ROOT}js/src/tfjs/custom_tf.min.js`)
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js`)
        }
        if (self.settings.BACKEND == 'wasm' && !('wasm' in tf.backend())) {
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.6.0/dist/tf-backend-wasm.min.js`)
            await tf.setBackend('wasm');
        }
        await tf.ready()
        // tf.enableProdMode()
        model = await tf.loadGraphModel(self.settings.MODELS_PATH+'glare_seg/tfjs/model.json')
        self.infer = async function(dst) {
            let tensor = await self.preprocess(dst)          
            let out_tensor = self.model.predict(tensor)
            let result = out_tensor.arraySync()[0]
            return result
        }
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        
        self.model = model
    }
}

function DocSegmentation(settings) {
    let self = this;
    this.settings = settings

    this.load_script = async function (src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    this.preprocess = function(src) {
        let dst = new cv.Mat();
        cv.resize(src, dst, new cv.Size(128, 128), 0, 0, cv.INTER_LINEAR)
        cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
        cv.cvtColor(dst, dst, cv.COLOR_BGR2RGB, 0);

        var tensor = nj.float32(dst.data);
        tensor = tensor.divide(255).reshape([1, dst.cols, dst.rows, 3])
        tensor = tensor.transpose(0, 3, 1, 2)

        dst.delete();
        return tensor
    }
    
    this.load_model_onnx = async function() {
        let model;
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        if (typeof ort == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/onnx/ort.wasm.min.js`)
        }

        // model = await ort.InferenceSession.create(self.settings.MODELS_PATH+'doc_seg/onnx/model.onnx', { executionProviders: ['wasm', 'cpu'] });
        model = await ort.InferenceSession.create(self.settings.MODELS_PATH+`doc_seg/onnx/model.ort`, { executionProviders: ['wasm', 'cpu']});
        
        self.infer = async function(src) {
            let tensor = self.preprocess(src)
            const tensorA = new ort.Tensor("float32", tensor.flatten().tolist(), tensor.shape);
            const feeds = { [self.model.inputNames[0]]: tensorA };
            const results  = await self.model.run(feeds);
            const output = results[Object.keys(results)[0]].data;
            const numberArray = Array.from(output, Number);

            return numberArray
        }
        
        self.model = model
    }

    this.load_model = async function() {
        let model;
        if (typeof tf == 'undefined') {
            // await self.load_script(`${self.settings.ROOT}js/src/tfjs/custom_tf.min.js`)
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js`)
        }
        if (self.settings.BACKEND == 'wasm' && !('wasm' in tf.backend())) {
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.6.0/dist/tf-backend-wasm.min.js`)
            await tf.setBackend('wasm');
        }
        await tf.ready()
        // tf.enableProdMode()
        model = await tf.loadGraphModel(self.settings.MODELS_PATH+'doc_seg/tfjs/model.json')
        self.infer = async function(dst) {
            let tensor = await self.preprocess(dst)   
            let out_tensor = self.model.predict(tensor)
            let result = out_tensor.arraySync()[0]
            return result
        }
        self.preprocess = async function (src) {
            let dst = new cv.Mat();
            // glaremodel 80x80 - 20x20
            // mobilevit 128x128 - 64x64
            cv.resize(src, dst, new cv.Size(128, 128), 0, 0, cv.INTER_LINEAR)
            cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
            cv.cvtColor(dst, dst, cv.COLOR_BGR2RGB, 0);
            // cv.imshow('canvasCamera', img)
            let tensor = tf.tensor(dst.data, [1, dst.cols, dst.rows, 3])
            tensor = tensor.div(tf.tensor1d([255]))

            //// Normalize
            // const mean = tf.tensor1d([0.35675976, 0.37380189, 0.3764753]);    
            // const variance = tf.tensor1d([0.32064945**2, 0.32098866**2, 0.32325324**2]);
            // tensor = tf.batchNorm(tensor, mean, variance);

            tensor = tf.transpose(tensor, [0, 3, 1, 2])
            dst.delete();
            return tensor
        }
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        
        self.model = model
    }

    this.argmaxSlices = function (array) {
        const length = array.length/2
        const slice1 = array.slice(0, length)
        const slice2 = array.slice(length, array.length)
        const result = [];

        for (let j = 0; j < slice1.length; j++) {
        const maxValue = Math.max(slice1[j], slice2[j]);
        const argmaxValue = slice1[j] === maxValue ? 0 : 1;
        result.push(argmaxValue);
        }
        
        return result;
    }

    this.get_mask = async function(src) {
        let doc_res  = await self.infer(src);
        var output = cv.matFromArray(128, 128, cv.CV_8UC1, doc_res)
        cv.resize(output, output, new cv.Size(src.cols, src.rows), 0, 0, cv.INTER_LINEAR)
        cv.threshold(output, output, 0.40,255,cv.THRESH_BINARY)
        // canvasOverlay.style.display='block'
        // cv.imshow('canvasOverlay', output)
        return output
    }

    this.minAreaRect_doc = async function(src) {
        function rotate(cx, cy, x, y, angle) {
            var radians = (Math.PI / 180) * -angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        function boxPoints(rect) {

            let cx = rect.center.x
            let cy = rect.center.y
            let w = (rect.size.width/2)
            let h = (rect.size.height/2)
            let angle = rect.angle
            let coord1 = rotate(cx, cy, cx+w, cy-h, angle)
            let coord2 = rotate(cx, cy, cx-w, cy-h, angle)
            let coord3 = rotate(cx, cy, cx-w, cy+h, angle)
            let coord4 = rotate(cx, cy, cx+w, cy+h, angle)
            return [
                coord1,
                coord2,
                coord3,
                coord4
            ]
        }

        let mask = await self.get_mask(src);

        // canvasOverlay.style.display='block'
        // cv.imshow('canvasOverlay', output)

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();

        
        cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
        let max_size = 0
        let box; let minArea;
        for (let i = 0; i < contours.size(); ++i) {
            let cnt = contours.get(i)
            let rect = cv.boundingRect(cnt);
            let size = rect['width']*rect['height']
            if (size > max_size) {
                max_size = size
                minArea = cv.minAreaRect(cnt)
                box = boxPoints(minArea)
                box = box.map((a)=>{return [a[0], a[1]]})
                break
            }    
        }


        contours.delete(); hierarchy.delete(); mask.delete();

        return {'box': box, 'minArea': minArea}

    }

    this.approxPolyDP_doc = async function(src) {
        let mask = await self.get_mask(src);

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        let poly = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
        let box_approx;
        for (let i = 0; i < contours.size(); ++i) {
            box_approx = []
            let cnt = contours.get(i)

            const epsilon = 0.02 * cv.arcLength(cnt, true); // You can adjust this epsilon value
            cv.approxPolyDP(cnt, poly, epsilon, true)

            // Iterate through the data32F array and extract the x/y coordinates
            for (let i = 0; i < poly.data32S.length; i += 2) {
                const x = poly.data32S[i];
                const y = poly.data32S[i + 1];
                box_approx.push([x,y])
            }

        }

        contours.delete(); hierarchy.delete(); poly.delete(); mask.delete();
        return {'box': box_approx}

    }

    this.hough_doc = async function(src, rho_similarity=15, theta_similarity=Math.PI/24.0) { // TODO
        function mod(n, m) {
            return ((n % m) + m) % m;
        }
        function sub(a1, a2) {
            /* get angle diff by smallest */
            return Math.min((a1 - a2 + Math.PI) % Math.PI, (a2 - a1 + Math.PI) % Math.PI);
        }
        function line_intersection(line1, line2) {
            xdiff = [line1[0][0] - line1[1][0], line2[0][0]-line2[1][0]]
            ydiff = [line1[0][1] - line1[1][1], line2[0][1]-line2[1][1]]

            function det(a, b) {
                return a[0] * b[1] - a[1] * b[0]
            }

            div = det(xdiff, ydiff)
        
            let d = [det(line1[0], line1[1]), det(line2[0], line2[1])]
            let x = det(d, xdiff) / div
            let y = det(d, ydiff) / div

            return {
                'x': x,
                'y': y
            }
        }
        function get_coords(lines) {
            let coords = new Array()
            for (let i = 0; i < lines.length; ++i) {
                let rho = lines[i][0];
                let theta = lines[i][1];
                let a = Math.cos(theta);
                let b = Math.sin(theta);
                let x0 = a * rho;
                let y0 = b * rho;
                let x1 = x0 - 1000 * b
                let y1 = y0 + 1000 * a
                let x2 = x0 + 1000 * b
                let y2 = y0 - 1000 * a
                coords.push([[x1, y1], [x2, y2]])
            }
            return coords
        }
        function draw_lines(src, lines) {
            if (lines.length > 1) {
                for (let i = 0; i < lines.length; ++i) {
                    let rho = lines[i][0];
                    let theta = lines[i][1];
                    let a = Math.cos(theta);
                    let b = Math.sin(theta);
                    let x0 = a * rho;
                    let y0 = b * rho;
                    let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
                    let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
                    cv.line(src, startPoint, endPoint, [255, 0, 0, 255]);
                }
            }
        }
        function get_corners(lines, img_size, margin=1){
            let corners = new Array()
            let w = img_size[0]
            let h = img_size[1]
            for (let i=0;i<3;i++) {
                lines.slice(i+1).forEach((line2)=>{
                    let intersect = line_intersection(lines[i], line2)
                    let x = intersect.x
                    let y = intersect.y
                    if (x >= -margin && y >= -margin && x < w+margin && y < h+margin) {
                        corners.push(new Array(x,y))
                    }
                })
            }
            return corners
        }
        function getDistance(point1, point2) {
            var sum = 0;
            for (var i = 0; i < point1.length; i++) {
              sum += Math.abs(point1[i] - point2[i]);
            }
            return sum;
          }
        function rearrangeCorners(srcCorners, dstCorners) {
            // Rearrange dst corners to prep warping transformation
            var mapping = [];
            for (var i = 0; i < srcCorners.length; i++) {
              var srcCorner = srcCorners[i];
              var minIndex = 0;
              var minDistance = getDistance(srcCorner, dstCorners[0]);
          
              for (var j = 1; j < dstCorners.length; j++) {
                var distance = getDistance(srcCorner, dstCorners[j]);
                if (distance < minDistance) {
                  minIndex = j;
                  minDistance = distance;
                }
              }
          
              mapping.push(dstCorners[minIndex]);
            }
          
            return mapping;
        }
        
        let mask;
        try {
            mask = await self.get_mask(src);
        } catch (error) {
            throw 'mask'+error
        }
        let dst = new cv.Mat();
        let kernel = cv.Mat.ones(3, 3, cv.CV_8U);
        let anchor = new cv.Point(-1, -1);
        cv.dilate(mask, dst, kernel, anchor=anchor, iterations=2); 
        kernel.delete();   
        cv.bitwise_xor(mask, dst, dst)
        let lines_mat = new cv.Mat();
        cv.HoughLines(dst, lines_mat, 1, Math.PI / 180, 60, 0, 0, 0, Math.PI) //80
                    
        let lines = new Array()
        for (let i = 0; i < lines_mat.rows; ++i) {
            if (lines.length >= 4) {
                break
            }
            rho = lines_mat.data32F[i * 2];
            theta = lines_mat.data32F[i * 2 + 1];
            if (rho < 0) {
                rho *= -1.0
                theta -= Math.PI
            }
            // theta = Math.abs(mod(theta,(2*Math.PI)))
            let similars = lines.filter(x => (Math.abs(x[0] - rho) < rho_similarity && sub(x[1], theta) < theta_similarity));
            if (similars.length) {
                continue
            }
            lines.push(new Array(rho, theta))
        }
        // draw_lines(dst, lines)
        // canvasOverlay.style.display='block'
        // cv.imshow('canvasOverlay', dst)
        lines_mat.delete();mask.delete(); dst.delete();
        
        if (lines.length !== 4) {
            throw 'card'
        }

        let w = src.cols
        let h = src.rows
        let coords = get_coords(lines)
        let corners = get_corners(coords, [w,h])
        src_corners = [[0,0], [w,0],[w, h],[0,h]]
        corners = rearrangeCorners(src_corners, corners)

        return {'box': corners}
    }
}

function GlareClassify(settings) {
    let self = this;
    this.settings = settings

    this.load_script = async function (src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    this.preprocess = function(src) {
        let dst = new cv.Mat();
        cv.resize(src, dst, new cv.Size(128, 128), 0, 0, cv.INTER_LINEAR)
        cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
        cv.cvtColor(dst, dst, cv.COLOR_BGR2RGB, 0);

        var tensor = nj.float32(dst.data);
        tensor = tensor.divide(255).reshape([1, dst.cols, dst.rows, 3])
        tensor = tensor.transpose(0, 3, 1, 2)

        dst.delete();
        return tensor
    }
    
    this.load_model_onnx = async function() {
        let model;
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        if (typeof ort == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/onnx/ort.wasm.min.js`)
        }

        // model = await ort.InferenceSession.create(self.settings.MODELS_PATH+'glare_seg/onnx/model.onnx', { executionProviders: ['wasm'] });
        model = await ort.InferenceSession.create(self.settings.MODELS_PATH+'glare_cls/onnx/model.ort', { executionProviders: ['wasm', 'cpu'] });
        self.infer = async function(src) {
            let tensor = self.preprocess(src)
            const tensorA = new ort.Tensor("float32", tensor.flatten().tolist(), tensor.shape);
            const feeds = { [self.model.inputNames[0]]: tensorA };
            const results  = await self.model.run(feeds);
            const output = results[Object.keys(results)[0]].data;
            const numberArray = Array.from(output, Number);

            return numberArray
        }
        
        self.model = model
    }

    this.load_model = async function() {
        let model;
        if (typeof tf == 'undefined') {
            // await self.load_script(`${self.settings.ROOT}js/src/tfjs/custom_tf.min.js`)
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js`)
        }
        if (self.settings.BACKEND == 'wasm' && !('wasm' in tf.backend())) {
            await self.load_script(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.6.0/dist/tf-backend-wasm.min.js`)
            await tf.setBackend('wasm');
        }
        await tf.ready()
        // tf.enableProdMode()
        model = await tf.loadGraphModel(self.settings.MODELS_PATH+'glare_seg/tfjs/model.json')
        self.infer = async function(dst) {
            let tensor = await self.preprocess(dst)          
            let out_tensor = self.model.predict(tensor)
            let result = out_tensor.arraySync()[0]
            return result
        }
        if (typeof nj == 'undefined') {
            await self.load_script(`${self.settings.ROOT}js/src/utils/numjs.min.js`)
        }
        
        self.model = model
    }
}

function QualityControl(settings, GM, GC) {
    let self = this
    this.settings = settings
    this.card;
    this.small_card;
    this.roi_centre;
    this.checklist = {};
    this.carryon_focus = {"min": 1, "max": 0, "values": [0, 0, 0, 0, 0]}
    this.carryon_blur = {"min": 200, "max": 0, "values": [0, 0, 0, 0, 0]}
    this.carryon_blur_static = {"min": 200, "max": 0, "values": [0, 0, 0, 0, 0]}
    this.GM = GM
    this.GC = GC
    this.rect;
    this.card_hq;
    

    this.reset_cards = function() {
        if (self.card !== undefined) {
            self.card.delete();
            self.card = undefined
        }
        if (self.small_card !== undefined) {
            self.small_card.delete();
            self.small_card = undefined
        }
        if (self.roi_centre !== undefined) {
            self.roi_centre.delete();
            self.roi_centre = undefined
        }
    }

    this.reset_carryon = function() {
        self.carryon_focus = {"min": 1, "max": 0, "values": [0, 0, 0, 0, 0]}
        self.carryon_blur = {"min": 200, "max": 0, "values": [0, 0, 0, 0, 0, 0, 0, 0, 0]}
        self.carryon_blur_static = {"min": 200, "max": 0, "values": [0, 0, 0, 0, 0, 0, 0, 0, 0]}
    }

    this.reset_checks = function () {
        self.checklist = {"exposure":false, "size":false, "blur": false, "glare": false, "focus": true}
    }

    this.check_size = function (width, height) {   
        if (width*height < 160*160) {
            throw "size"
        }
        self.checklist['size'] = true
    }

    this.check_aspect = function (width, height) {
        if (videoInput.offsetWidth > videoInput.offsetHeight) {
            aspect = [height, width]
        } else {
            aspect = [width, height]
        }
        // aspect.sort()

        let aspect_ratio = aspect[0]/aspect[1]
        if (aspect_ratio < 0.55 || aspect_ratio > 0.75) {
            throw 'card'
        }
    }

    this.resize_image = function (src, dst, max_size) {
        let width = src.cols 
        let height = src.rows
        let local_r = 1
        if (max_size < height | max_size < width) {

            if (height > width) {
                local_r = (max_size/height)
                width = width*local_r
                height = max_size 
            } else {
                local_r = (max_size/width)
                width = max_size
                height = height*local_r
            }
            
            cv.resize(src, dst, new cv.Size(width,height), 0, 0, cv.INTER_LINEAR)
        } else {
            cv.resize(src, dst, new cv.Size(width,height), 0, 0, cv.INTER_LINEAR)
        }
        return local_r
    }

    this.rotate_crop = function(src, angle, rect) {
        function rotate_image(src, dst, angle) {
            let dsize = new cv.Size(src.cols, src.rows);
            let center = new cv.Point(src.cols/2, src.rows/2);
            let M = cv.getRotationMatrix2D(center, angle, 1);
            cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar(255));
            M.delete();
        }

        let dst = new cv.Mat();
        rotate_image(src, dst, angle)
        let output = dst.roi(rect)
        dst.delete()
        return output
    }

    this.minAreaRect_doc = function(box) {
        let cnt = cv.matFromArray(box.length,1, cv.CV_32SC2, box.flat())
        minArea = cv.minAreaRect(cnt)
        cnt.delete();
        
        let angle = minArea.angle
        if (angle <= 90 && angle >=45) {
            angle = angle-90
            let tmp = minArea.size.height
            minArea.size.height = minArea.size.width
            minArea.size.width = tmp
        }

        let x = minArea.center.x-minArea.size.width/2
        let y = minArea.center.y-minArea.size.height/2
        let width = minArea.size.width
        let height = minArea.size.height
        
        let rect = new cv.Rect(x, y, width, height)

        return {'rect':rect, 'angle':angle, 'minArea': minArea}
    }

    this.crop_roi_centre = function(src) {
        let w = src.cols
        let h = src.rows

        let x = w/4
        let y = h/4
        let width = x*2
        let height = y*2

        let rect = new cv.Rect(x, y, width, height)
        let dst = src.roi(rect)

        // canvasOverlay.style.display='block'
        // cv.imshow('canvasOverlay', dst)
        return dst
    }

    this.crop_card  = async function(result, roi) {
        self.reset_cards()
        self.reset_checks()

        let minArea_result = self.minAreaRect_doc(result, roi)
        self.rect = minArea_result.rect
        self.angle = minArea_result.angle
        self.minArea = minArea_result.minArea
        self.check_size(self.rect.width, self.rect.height)
        self.check_aspect(self.rect.width, self.rect.height)
        if ((self.rect.y > 0 && self.rect.x > 0) && (self.rect.height > 0 && self.rect.width > 0) && (self.rect.height+self.rect.y <= roi.rows && self.rect.width+self.rect.x <= roi.cols)) {
            self.card = self.rotate_crop(roi, self.angle, self.rect)
            self.result = result
            self.small_card = new cv.Mat();
            self.resize_image(self.card, self.small_card, 100);
            self.roi_centre = self.crop_roi_centre(roi)
        } else {
            self.card = undefined;
            self.small_card = undefined;
            self.roi_centre = undefined;
            throw 'card'
        }
    }

    this.crop_card_hq = async function(roi_hq, roi_ratio) {
        if (self.card_hq !== undefined) {
            self.card_hq.delete();
            self.card_hq = undefined
        }
        let rect = {...self.rect}
        rect.x = rect.x/roi_ratio
        rect.y = rect.y/roi_ratio
        rect.width = rect.width/roi_ratio
        rect.height = rect.height/roi_ratio

        self.card_hq = self.rotate_crop(roi_hq, self.angle, rect)
    }

    // this.check_exposure_v1 = function (src) {
    //     let hls = new cv.Mat();
    //     let rgbaPlanes = new cv.MatVector();
    //     // Split the Mat
    //     cv.cvtColor(src, hls, cv.COLOR_RGB2HLS, 0);
    //     cv.split(hls, rgbaPlanes);
    //     // Get R channel
    //     let L = rgbaPlanes.get(1);

    //     let myMean = new cv.Mat(1,4,cv.CV_64F);
    //     let myStddev = new cv.Mat(1,4,cv.CV_64F);
    //     cv.meanStdDev(L, myMean, myStddev);
    //     let mean = myMean.doubleAt(0,0)
    //     hls.delete(); rgbaPlanes.delete(); L.delete(); myMean.delete(); myStddev.delete();

    //     if (mean < 60) {
    //         throw "exp_dark"
    //     } else if (mean > 220) {
    //         throw "exp_light"
    //     }

    //     self.checklist['exposure'] = true;
    // }
    this.check_exposure = function (src) {
        let normal = new cv.Mat();
        let bright = new cv.Mat();
        let dark = new cv.Mat();
        cv.cvtColor(src, normal, cv.COLOR_RGB2GRAY, 0);
        cv.normalize(normal, normal, 0, 1.0, cv.NORM_MINMAX, cv.CV_32FC1)
        // Gamma transform image with a gamma of 2.2 and 1/2.2
        cv.pow(normal, 2.2, bright)
        cv.pow(normal, 0.45, dark) 
        // Get derivatives of all three images using morphological gradient
        let elem = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3,3))
        cv.morphologyEx(normal, normal, cv.MORPH_GRADIENT,elem)
        cv.morphologyEx(dark, dark, cv.MORPH_GRADIENT,elem)
        cv.morphologyEx(bright, bright, cv.MORPH_GRADIENT,elem)
        cv.threshold(normal, normal,0.1,1.,cv.THRESH_BINARY)
        cv.threshold(dark, dark,0.1,1.,cv.THRESH_BINARY)
        cv.threshold(bright, bright,0.1,1.,cv.THRESH_BINARY)
        let number_of_dark_edges = 0
        let number_of_normal_edges = 0
        let number_of_bright_edges = 0

        let norm_0 = new cv.Mat();
        let bright_norm = new cv.Mat();
        let dark_norm = new cv.Mat();
        let dark_neg = new cv.Mat();
        let norm_elif = new cv.Mat();


        cv.bitwise_not(normal, norm_0)
        cv.bitwise_and(bright, norm_0, bright_norm)
        cv.bitwise_and(dark, norm_0, dark_norm) 
        cv.bitwise_not(dark_norm, dark_neg)
        cv.bitwise_and(dark_neg, normal, norm_elif) 
        
        number_of_normal_edges = cv.countNonZero(bright)+cv.countNonZero(dark_norm)+cv.countNonZero(norm_elif)
        number_of_bright_edges = cv.countNonZero(bright_norm)
        number_of_dark_edges = cv.countNonZero(dark_norm)


        norm_0.delete();
        bright_norm.delete();
        dark_norm.delete();
        dark_neg.delete();
        norm_elif.delete();

        
        normal.delete(); bright.delete(); dark.delete(); elem.delete();

        if (number_of_normal_edges == 0) {
            throw 'exp_dark'
        }
        
        let overexposed = number_of_bright_edges/number_of_normal_edges
        let underexposed = number_of_dark_edges/number_of_normal_edges
        
        // console.log(exposure_threshold, overexposed, underexposed)
        if (overexposed > self.settings.EXPOSURE_THRESHOLD) {
            // throw 'exp_light'
        } else if (underexposed > self.settings.EXPOSURE_THRESHOLD) {
            throw 'exp_dark'
        }

        self.checklist['exposure'] = true;
    }
    this.check_exposure_v2 = function (src) {
        let hls = new cv.Mat();
        let rgbaPlanes = new cv.MatVector();
        // Split the Mat
        cv.cvtColor(src, hls, cv.COLOR_RGB2HLS, 0);
        cv.split(hls, rgbaPlanes);
        // Get R channel
        let L = rgbaPlanes.get(1);

        let myMean = new cv.Mat(1,4,cv.CV_64F);
        let myStddev = new cv.Mat(1,4,cv.CV_64F);
        cv.meanStdDev(L, myMean, myStddev);
        let mean = myMean.doubleAt(0,0)
        hls.delete(); rgbaPlanes.delete(); L.delete(); myMean.delete(); myStddev.delete();
        // console.log(mean, 'mean')

        if (mean < 30) {  // 60
            throw "exp_dark"
        } 
        // else if (mean > 220) {
        //     throw "exp_light"
        // }
        self.checklist['exposure'] = true;
    }
    this.focus = function (src, sharpness_param=2.0) {
        function nbh_x(src) {
            let x3x3 = new cv.Mat();
            let w = src.cols;
            let h = src.rows;

            let gx1 = src.roi(new cv.Rect(0, 1, w-2, h-2))
            let gx2 = src.roi(new cv.Rect(1, 1, w-2, h-2))
            let gx3 = src.roi(new cv.Rect(2, 1, w-2, h-2))
            cv.addWeighted(gx1, 1, gx2, 1, 0, x3x3);
            cv.addWeighted(gx3, 1, x3x3, 1, 0, x3x3);
            gx1.delete(); gx2.delete(); gx3.delete();
            return x3x3
        }
        function nbh_y(src) {
            let y3x3 = new cv.Mat();
            let w = src.cols;
            let h = src.rows;

            let gy1 = src.roi(new cv.Rect(1, 0, w-2, h-2))
            let gy2 = src.roi(new cv.Rect(1, 1, w-2, h-2))
            let gy3 = src.roi(new cv.Rect(1, 2, w-2, h-2))
            cv.addWeighted(gy1, 1, gy2, 1, 0, y3x3);
            cv.addWeighted(gy3, 1, y3x3, 1, 0, y3x3);
            gy1.delete(); gy2.delete(); gy3.delete();
            return y3x3
        }

        let gray_img = new cv.Mat();
        let gradient_x = new cv.Mat();
        let gradient_y = new cv.Mat();
        let laplace_x = new cv.Mat();
        let laplace_y = new cv.Mat();
        // Filter noise, median filter doesn't hurt edges
        cv.cvtColor(src, gray_img, cv.COLOR_RGB2GRAY, 0);  
        cv.medianBlur(gray_img, gray_img, 3)
        // Get first and second x and y derivatives using morphology
        let elemx = cv.getStructuringElement(cv.MORPH_RECT,  new cv.Size(3,1))
        let elemy = cv.getStructuringElement(cv.MORPH_RECT,  new cv.Size(1,3))
        cv.morphologyEx(gray_img, gradient_x, cv.MORPH_GRADIENT, elemx)
        cv.morphologyEx(gray_img, gradient_y, cv.MORPH_GRADIENT, elemy)
        cv.morphologyEx(gradient_x, laplace_x, cv.MORPH_GRADIENT, elemx)
        cv.morphologyEx(gradient_y, laplace_y, cv.MORPH_GRADIENT, elemy)
        // Calculate sharpness for each pixel, based on 3x3 neighborhood
        let num = 0
        let shx = 0
        let shy = 0

        cv.convertScaleAbs(gradient_x, gradient_x)
        cv.convertScaleAbs(gradient_y, gradient_y)
        cv.convertScaleAbs(laplace_x, laplace_x)
        cv.convertScaleAbs(laplace_y, laplace_y)

        let gx = nbh_x(gradient_x)
        let gy = nbh_y(gradient_y)
        let lx = nbh_x(laplace_x)
        let ly = nbh_y(laplace_y)

        for (let i = 1; i < gray_img.rows-1; i++) {
            for (let j = 1; j < gray_img.cols-1; j++) {
                if ((gradient_x.ucharPtr(i,j)[0] > 1) || (gradient_y.ucharPtr(i,j)[0] > 1)) {
                    Sx = lx.ucharPtr(i-1,j-1)[0]
                    Sy = ly.ucharPtr(i-1,j-1)[0]
                    Cx = gx.ucharPtr(i-1,j-1)[0]
                    Cy = gy.ucharPtr(i-1,j-1)[0]

                    if (Sx) {
                        if (Cx/Sx < sharpness_param) {
                            shx+=1
                        }
                    }
                    if (Sy) {
                        if (Cy/Sy < sharpness_param) {
                            shy+=1
                        }
                    }
                    num+=1
                }
            }
        }

        gray_img.delete(); gradient_x.delete(); gradient_y.delete(); laplace_x.delete(); laplace_y.delete();
        elemx.delete(); elemy.delete();
        gx.delete(); gy.delete(); lx.delete(); ly.delete();

        // Divide the number of sharp pixels with the number of edge pixels, and get final focus value
        if (num == 0) {
            return 0.
        } else {
            sharpx = shx/num
            sharpy = shy/num
            // focus is always between 0 and sqrt (2)
            return Math.sqrt((sharpx*sharpx)+(sharpy*sharpy))
        }
    }
    this.is_focusing = function (carryon) {
        // Checks whether the focus_value has been changing rapidly in the last
        //       n_focus frames          
        let _min = 10000000000
        let _max =-10000000000
        let th = (carryon["max"]-carryon["min"]) * self.settings.MOVEMENT_THRESHOLD
        // Get the minimum and maximum recent focus values
        let n = carryon["values"].length
        for (let i=1; i<n; i++) {
            if (carryon["values"][i] < _min) {
                _min = carryon["values"][i]
            }
            if (carryon["values"][i] > _max) {
                _max = carryon["values"][i]
            }
        }
        return ((_max-_min) > th)
    }
    this.adaptive_threshold = function (value, percentage, carryon) {
        carryon["max"] = carryon["max"]-(carryon["max"]-carryon["min"])*0.2

        if (value < carryon["min"]) {
            carryon["min"] = value
        }
        if (value > carryon["max"]) {
            carryon["max"] = value
        }

        // We calculate the adaptive threshold
        let threshold = carryon["max"]-(carryon["max"]-carryon["min"])*percentage

        // We update the array of previous focus values
        let n = carryon["values"].length
        for (let i=1; i<n; i++) {
            carryon["values"][n-i] = carryon["values"][n-i-1]
        }
        carryon["values"][0] = value

        // // If there is movement in the focus values, we return false
        // if (is_focusing(carryon)) {
        //     console.log('moving too fast!!!')
        //     return false
        // }

        // Otherwise we threshold
        // console.log(value, threshold)
        return (value > threshold)
    }
    this.check_focus = function (src, focus_threshold=0.4) {
        function multi_f_focus(focus_value) {
            return self.adaptive_threshold(focus_value, self.settings.FOCUS_THRESHOLD, self.carryon_focus)
        }
        function single_f_focus(focus_value) {
            let threshold = 0.7+ self.settings.FOCUS_THRESHOLD * 0.7
            if (focus_value < threshold) {
                return false
            }
            return true
        }

        let focus_value = self.focus(src)
        // let sucf = single_f_focus(focus_value)
        let sucf = multi_f_focus(focus_value)

        if (!sucf) {
            throw "focus"
        }
        self.checklist['focus'] = true
    }
    this.check_blur = function (dst, roi_centre) {
        function get_blur(dst) {
            let laplacian_mat = new cv.Mat();
            cv.Laplacian(dst, laplacian_mat, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT)
            let myMean = new cv.Mat(1, 4, cv.CV_64F);
            let myStddev = new cv.Mat(1, 4, cv.CV_64F);
            cv.meanStdDev(laplacian_mat, myMean, myStddev);
            let sharpness = myStddev.doubleAt(0, 0);
            let blurriness = sharpness * sharpness;

            // console.log(blurriness, 'blurry')

            laplacian_mat.delete();myMean.delete();myStddev.delete();
            return blurriness
        }
        function multi_f_blur(value, carryon, percentage=0.3) {
            return self.adaptive_threshold(value, percentage, carryon)
        }
        function single_f_blur(value, threshold=300) {
            if (value < threshold) {
                return false
            }
            return true
        }
        
        let blur_value = get_blur(dst)
        let sucb = multi_f_blur(blur_value, self.carryon_blur, self.settings.BLUR_THRESHOLD)
        let blur_static_value = get_blur(dst)
        let sucb_roi_centre = multi_f_blur(blur_static_value, self.carryon_blur_static, 0.3)
        if (!sucb || !sucb_roi_centre) {
            // console.log(blur_value, self.carryon_blur, sucb)
            // console.log(blur_static_value, self.carryon_blur_static, sucb_roi_centre)
            // console.log('-------')
            throw "blur"
        }
        else {
            self.checklist['blur'] = true
        } 
                   
    }
    
    this.argmaxSlices = function (array) {
        const length = array.length/2
        const slice1 = array.slice(0, length)
        const slice2 = array.slice(length, array.length)
        const result = [];

        for (let j = 0; j < slice1.length; j++) {
        const maxValue = Math.max(slice1[j], slice2[j]);
        const argmaxValue = slice1[j] === maxValue ? 0 : 1;
        result.push(argmaxValue);
        }
        
        return result;
    }
    this.check_glareV2 = async function(src, live=false) {
        async function neural_glare(src) {
            // inference
            let glare_res  = await self.GM.infer(src);
            // var predicted = self.argmaxSlices(glare_res)
            var predicted = glare_res // argmax within model
            var output = cv.matFromArray(128, 128, cv.CV_32FC1, predicted)

            canvasOverlay.style.display='block'
            cv.imshow('canvasOverlay', output)
            
            return output
        }
        function rotate_coord(cx, cy, x, y, angle) {
            var radians = (Math.PI / 180) * -angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }
        function display_glare(segment, live=false) {
            const s = 5;
            let no_glare = true
            let dst = new cv.Mat.zeros(self.height*s, self.width*s, cv.CV_8UC4);
            let threshold = new cv.Mat();
            let contours = new cv.MatVector();
            let hierarchy = new cv.Mat(); 

            cv.threshold(segment, segment, 0.40,255,cv.THRESH_BINARY)
            segment.convertTo(threshold, cv.CV_8UC1)

            // canvasOverlay.style.display='block'
            // cv.imshow('canvasOverlay', segment);
            
            cv.findContours(threshold, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

            let card_x0 = -threshold.cols/2
            let card_y0 = -threshold.rows/2 

            let card_xc = self.minArea.center.x
            let card_yc = self.minArea.center.y

            for (let i = 0; i < contours.size(); ++i) {
                let rect = cv.boundingRect(contours.get(i));
                let border_check;
                let pad_x = 0.005*threshold.cols
                let pad_y = 0.005*threshold.rows
                border_check = (rect.x > pad_x & rect.x+rect.width < threshold.cols-pad_x & rect.y > pad_y & rect.y+rect.height < threshold.rows-pad_y)
                border_check = true
                if ((rect['width']*rect['height'] > 1) & border_check ) {
                    no_glare = false

                    let x = (rect['x']+rect['width']/2)
                    let y = (rect['y']+rect['height']/2)
                    let coord = rotate_coord(-card_x0, -card_y0, x, y, self.angle)
                    x = coord[0]
                    y = coord[1]
                    let glare_x0 = (card_xc + card_x0 + x)*s//self.roi_ratio
                    let glare_y0 = (card_yc + card_y0 + y)*s//self.roi_ratio
                    let glare_xy0 = new cv.Point(glare_x0, glare_y0)
                    let radius = (Math.max(rect['width'], rect['height'])/2)*s//self.roi_ratio
                    cv.circle(dst, glare_xy0, radius, new cv.Scalar(255,0,0, 255), 10)
                }
            }

            if (live) {
                cv.resize(dst, dst, new cv.Size(self.roi_width, self.roi_height), 0, 0, cv.INTER_LINEAR)
            }

            canvasOverlay.style.display='block'
            cv.imshow('canvasOverlay', dst);  

            contours.delete();
            hierarchy.delete();
            dst.delete();
            threshold.delete();
            segment.delete();
            
            return no_glare
        }


        let segment = await neural_glare(src);

        cv.resize(segment, segment, new cv.Size(src.cols, src.rows), 0, 0, cv.INTER_LINEAR)

        let no_glare = display_glare(segment, live);
        // segment.delete();
        // no_glare = false
        self.checklist['glare'] = no_glare
        return no_glare
    }
    this.check_glareV3 = async function(src, live=false) {
        let glare_cls_res = await self.GC.infer(src);
        let pred = self.argmaxSlices(glare_cls_res)[0]
        if (pred) {
            self.checklist['glare'] = false
            return false
        } else {
            self.checklist['glare'] = true
            return true
        }
    }
    this.run = async function () {
        const card = self.card;
        const small_card = self.small_card
        if (card !== undefined && small_card !== undefined ) {
            // perform quality checks
            // self.check_focus(small_card, self.settings.FOCUS_THRESHOLD);
            self.checklist["focus"] = true

            self.check_exposure_v2(small_card)

            // self.check_exposure(small_card, self.settings.EXPOSURE_THRESHOLD);
            // checklist["exposure"] = true

            if (self.settings.GLARE_LIVE_CHECK) {
                let g_value = await self.check_glareV3(card, true);
                if (!g_value) {
                    throw "glare"
                }
            } else {
                self.checklist["glare"] = true
            }

            self.check_blur(card);


        }
        return self.checklist;
    }

    this.init = async function () {
        self.reset_carryon()
    }
    self.init();
}

function Autocapture() { // eslint-disable-line no-unused-vars
    let self = this;
    let cv_utils;let videoInput;let canvasOutput; let canvasOverlay; let canvasCamera; let alertBox; let taskBox; let roi_div; let roi_border; let roi_mask; let roi_bg;let loading;var glareCNN;var NOTI;let chm; let started; let checklist; let is_drawed;
    var RATIO; var X0; var Y0; var check_count; var slidingwindow_complete; var alert_id; var FPS; var std_msg; let main_container; let mount_container; var card;
    let card_x0; let card_x1; let card_y0; let card_y1; let overlayToggleID; let QC; let GM; let GC; let DocModel; let retry_count; let exit; let capture_btn_container; let capture_btn; let force_capture; let force_hq; let start_btn_container; let start_btn; let explain_container; let explain_img; let explain_text; let explain_button;

    let frame_init = 0; let fps_total = []; //DEBUG

    this.width;
    this.height;

    this.start = function () {
        start_btn_container.style.display = "none"
        started = true;
        // self.timeouts.push(setTimeout(function () {
        //     std_msg = NOTI['std_msg_1']
        // }, 4000))
        if (self.settings.CAPTURE_BTN_AFTER) {
            self.timeouts.push(setTimeout(function () {
                capture_btn_container.style.display = 'flex'
            }, self.settings.CAPTURE_BTN_AFTER))
        }
        self.task(std_msg, 0)
    }
    this.clear_timeouts = function() {
        let timeoutIds = self.timeouts
        while (timeoutIds.length > 0) {
          const timeoutId = timeoutIds.pop();
          clearTimeout(timeoutId);
        }
    }
    this.exit = function () {
        self.running = false
        self.stop()
        self.settings.onUserExit("exit")
    }
    this.restart = function() {
        retry_count = 0
        check_count = 0
        started = false
        roi_border.style.stroke = "white"
        capture_btn_container.style.display = 'none'
        self.hide_loader();
        self.hide_alert();
        self.clear_canvas();
    }
    this.remove_container = function () {
        main_container.remove()
    }
    this.stop = function () {
        QC.reset_cards();
        self.onVideoStopped();
        self.remove_container();
    }
    this.clear_canvas = function () {
        canvasOutput.getContext('2d').clearRect(0, 0, canvasOutput.width, canvasOutput.height);
        canvasOverlay.getContext('2d').clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
    };
    this.checkmark = async function () {
        roi_border.style.stroke = "#6cbd45"
        self.hide_alert();
        self.show_loader();
        chm.style.display = 'block';
        await new Promise(function (resolve, reject) { 
            setTimeout(async function () {
                // self.flash_background();
                chm.style.display = 'none';
                resolve()
            }, 1000)
        })
    }
    this.show_loader = function () {
        loading.style.display = 'inline-block'
    }
    this.hide_loader = function () {
        loading.style.display = 'none'
    }
    this.flash_background = function () {
        roi_div.classList.add("backgroundAnimated")
    }
    this.clear_roi = function() {
        roi_div.innerHTML = ""
    }
    this.show_roi_border = function() {
        if (roi_border.attributes.opacity.value !== "1") {
            roi_border.setAttribute("opacity", `1`);
        }
    }

    this.reduce_roi_border = function() {
        if (roi_border.attributes.opacity.value == "1") {
            roi_border.setAttribute("opacity", `0.5`);
        }
    }
    this.show_explain = function () {
        explain_container.style.display = "flex"
    }
    this.hide_explain = function () {
        start_btn_container.style.display = "flex"
        explain_container.style.display = "none"
    }
    this.alert = function (id=null, ms=0) {
        // Create alertBox if it doesnt exist
        alertBox = document.getElementById('alertBox');
        if (alertBox === null) {
            window.document.body.innerHTML = '<div id="alertContainer">                <div id="alertBox"></div>          </div>'
            alertBox = document.getElementById('alertBox');
        }

        let msg;
        try {
            if (typeof(NOTI)=='undefined') {
                msg = 'Notifications failed to load.'
            }
            else if (id) {
                if (id in NOTI) {
                    msg = NOTI[id]
                }
                else {
                    msg = id
                }
            }     
        } catch (error) {
            msg = 'Internal error'
            if (self.settings.DEBUG == true) {
                msg = id
            }
        }
        
        if (msg!==alertBox.innerText) {
            alertBox.style.display = "flex"
            alertBox.innerText = msg
        }

        if (ms) {
            alert_id = setTimeout(function () {
                alertBox.innerText = ""
                alertBox.style.display = "none"
            }, ms)
        }
    }
    this.hide_alert = function () {
        alertBox.innerText = ""
        alertBox.style.display = "none"
    }
    this.task = function (id=null, ms=0) {
        // Create alertBox if it doesnt exist
        taskBox = document.getElementById('taskBox');
        if (taskBox === null) {
            window.document.body.innerHTML = '<div id="taskContainer">                <div id="taskBox"></div>          </div>'
            taskBox = document.getElementById('taskBox');
        }

        let msg;
        try {
            if (typeof(NOTI)=='undefined') {
                msg = 'Notifications failed to load.'
            }
            else if (id) {
                if (id in NOTI) {
                    msg = NOTI[id]
                }
                else {
                    msg = id
                }
            }     
        } catch (error) {
            msg = 'Internal error'
            if (self.settings.DEBUG == true) {
                msg = id
            }
        }
        
        if (msg!==taskBox.innerText) {
            taskBox.style.display = "flex"
            taskBox.innerText = msg
        }

        if (ms) {
            task_id = setTimeout(function () {
                taskBox.innerText = ""
                taskBox.style.display = "none"
            }, ms)
        }
    }
    this.hide_task = function () {
        taskBox.innerText = ""
        taskBox.style.display = "none"
    }
    this.resize_image = function (src, dst, max_size) {
        let width = src.cols 
        let height = src.rows

        if (max_size < height | max_size < width) {

            if (height > width) {
                local_r = (max_size/height)
                width = width*local_r
                height = max_size 
            } else {
                local_r = (max_size/width)
                width = max_size
                height = height*local_r
            }
            
            cv.resize(src, dst, new cv.Size(width,height), 0, 0, cv.INTER_LINEAR)
        } else {
            dst = src
            local_r = 1
        }
        return local_r
    }
    this.clear_glare = function() {
        if (is_drawed) {
            self.clear_canvas();
            is_drawed = false;
        }
    }
    this.getContainedSize = function(img) {
        var ratio = img.naturalWidth/img.naturalHeight
        var width = img.height*ratio
        var height = img.height
        if (width > img.width) {
          width = img.width
          height = img.width/ratio
        }
        return [width, height]
    }
    this.toggle = function(elem) {
        let current = elem.style.display;
        if (current === "none") {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    }
    this.check_oob = function (coords, roi) {
        let width = roi.cols
        let height = roi.height

        coords.forEach(([x,y]) => {
            if (x < 0 || x > width || y < 0 || y > height) {
                throw 'card'
            } 
        })
    }
    this.check_area = function (poly) {
        let switch_value = true;
        let area = 0
        let arc = 0
        // console.log(poly.length)
        if (poly && poly.length) {
            let point_data = new Array()
            poly.flat().forEach((elem)=>{
                // elem = elem/RATIO
                // if (switch_value) {
                //     elem = parseInt(X0+elem)
                // } else {
                //     elem = parseInt(Y0+elem)
                // }
                point_data.push(elem)
                switch_value = !switch_value
            })

            let square_points = cv.matFromArray(poly.length, 1, cv.CV_32SC2, point_data);
            let pts = new cv.MatVector();
            pts.push_back(square_points);
            area = parseInt(cv.contourArea(square_points))
            // arc = parseInt(cv.arcLength(square_points, true))
        
            pts.delete();
            square_points.delete();
            delete point_data;
        }
        return area
    }

    this.draw_poly = function (poly) {
        try {
            let dst = new cv.Mat.zeros(videoInput.offsetHeight, videoInput.offsetWidth, cv.CV_8UC4);
            let color = [0, 255, 0, 100];
            let switch_value = true;
            if (poly.length) {
                let point_data = new Array()
                poly.flat().forEach((elem)=>{
                    elem = elem/RATIO
                    if (switch_value) {
                        elem = parseInt(X0+elem)
                    } else {
                        elem = parseInt(Y0+elem)
                    }
                    point_data.push(elem)
                    switch_value = !switch_value
                })

                let square_points = cv.matFromArray(poly.length, 1, cv.CV_32SC2, point_data);
                let pts = new cv.MatVector();
                pts.push_back(square_points);
                // cv.fillPoly(dst, pts, color);
                for (let i = 0; i < point_data.length; i += 2) {
                    let startPoint = new cv.Point(point_data[i], point_data[i + 1]);
                    let endPoint = new cv.Point(point_data[(i + 2) % point_data.length], point_data[(i + 3) % point_data.length]);
                    cv.line(dst, startPoint, endPoint, color, 5);
                }
                pts.delete();
                square_points.delete();
                delete point_data;
            }
            cv.imshow('canvasOutput', dst);
            dst.delete();
        } catch (e) {
            throw e
        }
    }

    this.update_slidingwindow = function (bool, slidingwindow, max_length=undefined) {
        max_length = max_length?max_length:self.settings.SLIDINGWINDOW_LENGTH
        if (slidingwindow.length >= max_length) {
            slidingwindow.shift()
        }        
        slidingwindow.push(bool)
    }
    this.eval_slidingwindow = function (slidingwindow, check_length=true, thresh=undefined) {
        thresh = thresh?thresh:self.settings.SLIDINGWINDOW_THRESH
        const sum = slidingwindow.reduce((a, b) => a + b, 0);
        const avg = (sum / slidingwindow.length) || 0;
        let value = false
        if (avg > thresh) {
            value = true
        }
        if (check_length) {
            return value & (slidingwindow.length == self.settings.SLIDINGWINDOW_LENGTH)
        }
        return value
    }

    this.has_flipped = false
    this.mrz_read = false
    this.parse_mrz = function (text, angle=0) {
        if (!self.mrz_read) {
            self.mrz_read = true
            if (Array.isArray(text)) {
                text = text.join('\n');
            }
            found = self.MRZ.parse(text)
            if (found.success) {
                if (!self.settings.CROP_CARD) {
                    angle = (angle-QC.angle)%360
                }
                found.mrz['angle'] = angle
                self.output.mrz = found.mrz
                self.output.meta.push({'angle':angle})
            }
        }
    }

    this.reset_force = function () {
        force_capture = false
        force_hq = false
    }

    this.save_image = async function (image_data_url, angle=0) {
        function validate_flip() {
            return (self.settings.MRZ && self.settings.MRZ_SETTINGS.FLIP && !self.has_flipped)
        }
        async function perform_flip() {
            let flip_suffix = ""
            if (self.output.mrz) {
                streaming = false
                // self.settings.MRZ = false
                let misc = self.output.mrz.misc
                if (misc=='P' || misc=='D') {
                    flip_suffix = '_backside'
                    explain_img.src = `${self.settings.ROOT}images/pp_front-back.gif`
                } else {
                    flip_suffix = '_frontside'
                    explain_img.src = `${self.settings.ROOT}images/id_back-front.gif`
                }
                if (self.settings.MRZ_SETTINGS.FLIP_EXCEPTION.includes(misc)){
                    // self.settings.MRZ_SETTINGS.FLIP = false
                    self.has_flipped = true
                    streaming = false
                }
            }
            if (self.output.images.length==1 && !self.has_flipped ) {
                self.has_flipped = true
                streaming = true
                // std_msg = self.start_prompt
                // start_btn.innerText = `${NOTI[self.start_prompt]}\n\n${NOTI.start_prompt}`
                explain_text.innerText = NOTI[`flip${flip_suffix}`]
                self.hide_task();
                await self.checkmark();
                self.show_explain()
                self.reduce_roi_border();
                self.restart();
            }
            
        }
        function get_coordinates() {
            let coordinates = QC.result
            if (typeof coordinates == 'undefined') {
                coordinates = NaN
            } else if (self.settings.CROP_CARD) {
                let w = canvasCamera.width
                let h = canvasCamera.height
                coordinates = [
                    [0,0],
                    [w,0],
                    [w, h],
                    [0, h]
                ]
            } else {
                coordinates = coordinates.map(row => row.map(element => element / self.roi_ratio));
            }
            return coordinates
        }

        self.clear_timeouts();
        // capture_btn_container.style.display = 'none'
        self.output.images.push(image_data_url)

        let coordinates = get_coordinates()

        if (self.output.images.length !== self.output.meta.length) {
            self.output.meta.push({
                'angle': angle,
                'coordinates': coordinates
            })
        } else {
            var lastItemIndex = self.output.meta.length - 1;
            self.output.meta[lastItemIndex]['coordinates'] = coordinates;
        }

        self.reset_force();

        if (validate_flip()) {
            await perform_flip()
        }
    }

    this.capture = function () {
        force_capture = true
    }

    this.viewport = []

    this.check_viewport = function (src_h, src_w, vid_h, vid_w) {
        const viewport = `${src_h}, ${src_w}, ${vid_h}, ${vid_w}`
        if (self.viewport == viewport) {
            return true
        } else {
            self.viewport = viewport
            return false
        }
    }
    
    this.onVideoStarted = async function () {
        streaming = true;
        // self.show_loader();

        // setTimeout(function () {
        //         std_msg = NOTI['std_msg_1']
        //     }, 4000)
    
        //Global functions
        function mod(n, m) {
            return ((n % m) + m) % m;
        }
    
        async function pipeline(src) {
            function pre_process(src) {
                function crop_camera(src) {
                    function horizontal_crop(src) {
                        crop_width = parseInt(src.rows/offset_ratio)
                        crop_left = parseInt((src.cols-crop_width)/2)
                        crop_up = 0
                        crop_height = src.rows
                        let rect = new cv.Rect(crop_left, crop_up, crop_width, crop_height)
                        return rect
                    }
                    function vertical_crop(src) {
                        crop_width = src.cols
                        crop_left = 0
                        crop_height = parseInt(src.cols*offset_ratio)
                        crop_up = parseInt((src.rows-crop_height)/2)
                        let rect = new cv.Rect(crop_left, crop_up, crop_width, crop_height)
                        return rect
                    }
                    //reset 
                    RATIO = 1;
                    roi_div.style.display = 'flex';

                    // self.height = videoInput.offsetHeight
                    // self.width = videoInput.offsetWidth
       
                    let rect;
                    let aspect_ratio = src.rows/src.cols
                    let offset_ratio = videoInput.offsetHeight/videoInput.offsetWidth
                    let crop_left; let crop_up; let crop_width; let crop_height;
    
                    if (offset_ratio >= aspect_ratio) {
                        rect = horizontal_crop(src);
                    } else {
                        rect = vertical_crop(src);
                    }
                    
                    let roi = src.roi(rect)
                    return roi
                }
                function create_roi(src) {
                    let src_height = src.rows
                    let src_width = src.cols
                    let local_r = src_width/videoInput.offsetWidth
                    
                    let td3_ratio; let roi_h; let roi_w;
                    if (videoInput.offsetHeight > videoInput.offsetWidth) {
                        td3_ratio = 125/88
                    } else {
                        td3_ratio = 88/125
                    }

                    let min_w = src_width*0.75
                    let min_h = src_height*0.75

                    roi_w = min_w
                    roi_h = roi_w*td3_ratio

                    if (roi_h > min_h) {
                        let r = min_h/roi_h
                        roi_h = min_h
                        roi_w = roi_w*r
                    } 
    
                    
    
                    let y0 = parseInt((src_height-roi_h)/2)
                    let x0 = parseInt((src_width-roi_w)/2)
                    X0 = parseInt(x0/local_r)
                    Y0 = parseInt(y0/local_r)
    
                    let rect = new cv.Rect(x0, y0, roi_w, roi_h)
                    let roi = src.roi(rect)

                    RATIO *= local_r

                    if (self.check_viewport(src.rows, src.cols, videoInput.offsetHeight, videoInput.offsetWidth)) {
                        return roi
                    }

                    self.roi_width = roi_w/local_r
                    self.roi_height = roi_h/local_r

                    alertBox.style.maxWidth = self.roi_width-60+'px'
    
                    roi_border.style.width = self.roi_width+'px'
                    roi_border.style.height = self.roi_height+'px'
                    roi_border.style.x = X0+'px'
                    roi_border.style.y = Y0+'px'
    
                    roi_mask.style.width = self.roi_width-30+'px'
                    roi_mask.style.height = self.roi_height-30+'px'
                    roi_mask.style.x = X0+15+'px'
                    roi_mask.style.y = Y0+15+'px'
    
                    roi_bg.style.width = videoInput.offsetWidth+'px'
                    roi_bg.style.height = videoInput.offsetHeight+'px'
    
    
                    return roi
                }
                function resize_image(src, dst, max_size) {
                    let width = src.cols 
                    let height = src.rows
                    let local_r = 1
                    if (max_size < height | max_size < width) {
    
                        if (height > width) {
                            local_r = (max_size/height)
                            width = width*local_r
                            height = max_size 
                        } else {
                            local_r = (max_size/width)
                            width = max_size
                            height = height*local_r
                        }
                        
                        cv.resize(src, dst, new cv.Size(width,height), 0, 0, cv.INTER_LINEAR)
                        RATIO *= local_r
                    } else {
                        cv.resize(src, dst, new cv.Size(width,height), 0, 0, cv.INTER_LINEAR)
                    }
                    return local_r
                }
    
                let cropped = crop_camera(src)
    
                let roi = new cv.Mat();

                roi_hq = create_roi(cropped);
                resize_image(roi_hq, roi_hq, 1920) // size limit of images
                self.roi_ratio = resize_image(roi_hq, roi, 300)

                self.height = roi.rows
                self.width = roi.cols

                QC.height = roi.rows
                QC.width = roi.cols
                QC.roi_height = self.roi_height
                QC.roi_width = self.roi_width

                let imgs = {
                    "roi_hq": roi_hq,
                    "roi": roi,
                    "cropped": cropped,
                }
                return imgs
            }
            async function main_process(imgs) {
                function update_checks() {
                    //let checks = false
                    let checks = Object.values(checklist).every(Boolean)
                    if (checks) {
                        check_count++
                    } else {
                        check_count = check_count>1?(check_count-2):0
                    }
                }
                function reset_checks() {
                    checklist = {"lines": false, "card": false, "exposure":false, "size":false, "blur": false, "glare": false, "focus": true}
                }

                reset_checks();

                if (force_capture) {
                    if (!force_hq) {
                        check_count = self.settings.CHECK_TOTAL-1
                        self.clear_glare();
                    }
                    check_count++
                    force_hq = true
                    return
                }

                try {
                    // results = await DocModel.minAreaRect_doc(imgs.roi)
                    // results = await DocModel.approxPolyDP_doc(imgs.roi)  
                    results = await DocModel.hough_doc(imgs.roi)

                    // // console.log(results.minArea)
                    let result = results.box
       
                    // self.draw_poly(result)

                    self.check_oob(result, imgs.roi)

                    area = self.check_area(result)
                    if (area < 0.2*(imgs.roi.cols*imgs.roi.rows)) {
                        checklist['card'] = false
                        throw 'card'
                    }

                    if (result.length == 4) {
                        checklist['lines'] = true
                        checklist['card'] = true
                    }

                    let qc_checklist;
                    try {
                        await QC.crop_card(result, imgs.roi) 
                        qc_checklist= await QC.run();        
                        // console.log(qc_checklist)
                        checklist = {...checklist, ...qc_checklist}
                    } catch (error) {
                        qc_checklist = {}
                        // console.log(error)
                        checklist = {...checklist, ...qc_checklist}
                        throw error
                    }

                    // console.log(checklist)

                    // checklist['lines'] = true
                    // checklist['card'] = false
                    // console.log(slidingwindow_complete)

                    self.update_slidingwindow(true, slidingwindow_complete)
                    if (self.eval_slidingwindow(slidingwindow_complete)) {
                        self.show_loader();
                        roi_border.style.stroke = "white"
                        self.alert('blur', 0)
                        // self.hide_alert();
                        clearTimeout(alert_id)
                        self.clear_glare();
                        // console.log(check_count)
                    } else {
                        check_count = check_count>1?(check_count-1):0
                    }
                    self.show_roi_border()
                } catch (e) {
                    if (self.settings.DEBUG) {
                        console.log(JSON.stringify(e))
                    }
                    self.update_slidingwindow(false, slidingwindow_complete)
                    if (checklist['card'] == false) {
                        roi_border.style.stroke = "white"
                        self.reduce_roi_border()
                    } else {
                        self.show_roi_border()
                    }

                    if (e == 'blur') {
                        // roi_border.style.stroke = "red"
                    } else {
                        self.hide_alert();
                        self.hide_loader();
                        if (e == 'glare') {
                            is_drawed = true;
                            roi_border.style.stroke = "orange"
                        }
                        if (e !== 'glare') {
                            self.clear_glare();
                        }
                        if (!checklist['card'] || e == 'card') {
                            // self.alert(std_msg, 0)
                            self.clear_canvas(); // TODO (ONLY FOR DRAW POLY)
                        } else {
                            self.alert(e, 0)
                        }
                    }
                } finally {
                    update_checks();
                }
            }
            async function post_process(imgs) {
                async function locate_mrz(src) {
                    function preprocess(src) {
                        // let kernel = new cv.Size(3,3)
                        // cv.GaussianBlur(src, src,kernel,0)
                        cv.normalize(src,  src, 0, 255, cv.NORM_MINMAX)
                        // cv.GaussianBlur(src, src,kernel,0)
                        // cv.adaptiveThreshold(src, src,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY,11,2)
                        // cv.threshold(src, src, 0,255,cv.THRESH_BINARY+cv.THRESH_OTSU)
                        // cv.threshold(src, src, 127,255,cv.THRESH_BINARY_INV)
                        return src
                    }
                    function crop_to_lines(src) {
                        let dst = src.clone();
                        let width = src.cols;
                        let height = src.rows;

                        cv.threshold(dst, dst, 127,255,cv.THRESH_BINARY_INV)
                        let kernel = cv.Mat.ones(1, 3, cv.CV_8U);
                        let anchor = new cv.Point(-1, -1);
                        cv.dilate(dst, dst, kernel, anchor=anchor, iterations=3);
                        let row_avg = new cv.Mat();
                        cv.reduce(dst, row_avg, 1, cv.REDUCE_AVG, cv.CV_32F);
                        var index = row_avg.data32F.findIndex(function(number) {
                            return number > 150
                        })

                        function rotate_text(src, dst) {

                            cv.Canny(dst, dst, 20, 75) // 20 75

                            let n = 20
                            let lines_mat = new cv.Mat();
                            cv.HoughLines(dst, lines_mat, 1, Math.PI / 180, 60, 0, 0, 0, Math.PI) //80
                            if (lines_mat.rows < n) {
                                n = lines_mat.rows
                            }
                            let lines = new Array()
                            for (let i = 0; i < n; ++i) {
                                rho = lines_mat.data32F[i * 2];
                                theta = lines_mat.data32F[i * 2 + 1];
                                if (rho < 0) {
                                    rho *= -1.0
                                    theta -= Math.PI
                                }
                                theta = Math.abs(mod(theta,(2*Math.PI)))
                                lines.push(theta)
                            }
                            lines_mat.delete();

                            const average = array => array.reduce((a, b) => a + b) / array.length;

                            function rotate_image(src, angle) {
                                function radians_to_degrees(radians)
                                {
                                var pi = Math.PI;
                                return radians * (180/pi);
                                }

                                angle = (radians_to_degrees(angle)-90)%90
            
                                // console.log(angle)

                                if (Math.abs(angle) < 2) {
                                    let dsize = new cv.Size(src.cols, src.rows);
                                    let center = new cv.Point(src.cols/2, src.rows/2);
                                    let M = cv.getRotationMatrix2D(center, angle, 1);
                                    cv.warpAffine(src, src, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar(255));
                                    M.delete();
                                }
                            }

                            if (lines.length) {
                                rotate_image(src, average(lines))
                            }

                            kernel.delete(); dst.delete(); row_avg.delete();
                        }

                        rotate_text(src, dst)

                        let padding = 10
                        if (index > 0 && index >= padding && index > height/4) {                            
                            let mrz_rect = new cv.Rect(0, parseInt(index-padding), width, parseInt(height-index+padding))
                            src = src.roi(mrz_rect)
                        }

                        function prop_norm(src) {
                            let upper_bound = new cv.Mat(src.rows, src.cols, cv.CV_8UC1, new cv.Scalar(70))
                            cv.subtract(src, upper_bound, src)
                            cv.add(src, upper_bound, src)
                            cv.add(src, upper_bound, src)
                            cv.subtract(src, upper_bound, src)
                            cv.normalize(src,  src, 0, 255, cv.NORM_MINMAX)
                        }

                        prop_norm(src)

                        // cv.imshow('canvasCamera', src)
                        // canvasCamera.style.display = 'block'
                        return src
                    }
                    function crop(card) {
                        let quarter = parseInt(card.rows/16)
                        let padding = parseInt(card.cols*0.03)
                        let x = padding
                        let width = card.cols-x-padding
                        let y = quarter*11
                        let height = card.rows-y-padding

                        let mrz_rect = new cv.Rect(parseInt(x), parseInt(y), parseInt(width), parseInt(height))
                        dst = card.roi(mrz_rect)

                        dst = preprocess(dst)
                        dst = crop_to_lines(dst)

                        cv.imshow('canvasCameraMRZ', dst)
                        dst.delete();
                        return document.getElementById('canvasCameraMRZ').toDataURL('image/jpeg');
                    }
                    
                    await QC.crop_card_hq(imgs.roi_hq, self.roi_ratio)
                    let card = QC.card_hq
                    let angle0 = 0
                    if (card.cols < card.rows) {
                        // to horizontal
                        angle0 += 90
                        cv.rotate(card, card, cv.ROTATE_90_CLOCKWISE);
                    }

                    self.resize_image(card, card, 400)

                    cv.cvtColor(card, card, cv.COLOR_RGB2GRAY)
                    
                    let mrz1 = crop(card)
                    cv.rotate(card, card, cv.ROTATE_180);
                    let mrz2 = crop(card)

                    // canvasCamera.style.display = 'block'
                    // throw '3'

                    self.card = [{'img':mrz1, 'angle':angle0}, {'img':mrz2, 'angle':angle0+180}]
                }

                function validate_retry() {
                    return (retry_count <= self.settings.MRZ_SETTINGS.MRZ_RETRIES || self.settings.MRZ_SETTINGS.MRZ_RETRIES == -1) && (!('mrz' in self.output)) && !force_capture
                }

                streaming = false;
                canvasCamera.style.display = 'None'
                if (self.settings.CROP_CARD && !force_capture) {
                    await QC.crop_card_hq(imgs.roi_hq, self.roi_ratio)
                    cv.imshow('canvasCamera', QC.card_hq)
                } else {
                    cv.imshow('canvasCamera', imgs.roi_hq)
                }
                let image_data_url = canvasCamera.toDataURL('image/png').split(',')[1];

                if ('onImage' in self.settings) {
                    self.settings.onImage(image_data_url)
                }
                
                if (self.settings.MRZ) {
                    if (!self.mrz_read) {
                        self.alert('mrz_search', 0)   
                    }
                    let retry_valid = validate_retry()
                    if (retry_valid) {
                        retry_count+=1
                        check_count -= 1
                        streaming = true;
                        if (self.settings.MRZ_SETTINGS.OCR) {
                            await locate_mrz(imgs.roi_hq)
                            let found = await self.MRZ.find_mrz_async(self.card)
                            if (found.success &&  found.mrz.valid_score >= self.settings.MRZ_SETTINGS.MIN_VALID_SCORE) {
                                self.output['mrz'] = found.mrz
                                self.mrz_read = true
                                if (!self.settings.CROP_CARD) {
                                    found.mrz.angle = (found.mrz.angle-QC.angle)%360
                                }
                                streaming = false
                                await self.save_image(image_data_url, found.mrz.angle)
                            }
                        }
                    } else {
                        await self.save_image(image_data_url)
                    }

                } else {
                    await self.save_image(image_data_url)
                }

            }
            function clean(imgs) {
                for (const key of Object.keys(imgs)) {
                    imgs[key].delete()
                }
            }
            
            let imgs = pre_process(src)

            if (started) {
                await main_process(imgs);
            }
      
            if (check_count > self.settings.CHECK_TOTAL) {
                self.height = imgs["roi"].rows
                self.width = imgs["roi"].cols
                // self.height = roi_hq.rows
                // self.width = roi_hq.cols
                await post_process(imgs)
            }
            clean(imgs)
        }

        async function approval() {
            mount_container.innerHTML = "<div class='center fullscreen column'> <div id='outputDiv'></div><div id='description'></div> <div id='outputControls' class='column'></div></div>"
            let description = document.getElementById('description');
            let outputDiv = document.getElementById('outputDiv');
            let outputControls = document.getElementById('outputControls');
            description.innerText = "Analyzing..."

            let div_images = "<div style='display:flex;height:100%;overflow-x:auto;'>"
            self.output.images.forEach((element, i) => {
                div_images+='<img id="output'+i+'" style="position:relative;" src="'+'data:image/png;base64,'+element+'">'
            });
            outputDiv.innerHTML = div_images+"</div>"


            description.innerText = NOTI["approval_prompt"]

            outputControls.innerHTML = "<button id='confirm'>"+NOTI["confirm"]+"</button>"+"<button id='retry'>"+NOTI["retry"]+"</button>"
            let retry = document.getElementById('retry');
            let confirm = document.getElementById('confirm');
            retry.onclick = function() {
                self.stop()
                self.init(self.settings)
            }
            confirm.onclick = function() {
                self.stop()
                if ('onComplete' in self.settings) {
                    self.settings.onComplete(self.output)
                }
            }
            
        }

        async function read_from_canvas(src) {
            let ratio;
            let width = videoInput.width
            let height = videoInput.height
            if (check_count < self.settings.CHECK_TOTAL && !force_capture) {
                if (videoInput.width > videoInput.height) {
                    width = 640
                    ratio = videoInput.width/width
                    height = parseInt(videoInput.height/ratio)
                } else {
                    height = 640
                    ratio = videoInput.height/height
                    width = parseInt(videoInput.width/ratio)
                }
            }
            canvasCamera.width = width
            canvasCamera.height = height
            let ctx = canvasCamera.getContext("2d", { willReadFrequently: true });
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(videoInput, 0, 0, width, height)
            // canvasCamera.style.display = 'block';
            canvasCamera.style.display = 'None';
            var imgData = ctx.getImageData(0, 0, canvasCamera.width, canvasCamera.height);
            src = cv.matFromImageData(imgData);


            canvasCamera.width = 1;
            canvasCamera.height = 1;
            ctx && ctx.clearRect(0, 0, 1, 1);

            // console.log(src.cols, src.rows, src.data32F[0], 'src')
            return src
        }
    
        async function processVideo() {
            let begin = performance.now();

            try {
                if (!self.running) {
                    return
                }
                // let cap = new cv.VideoCapture(videoInput);
                videoInput.width = videoInput.videoWidth;
                videoInput.height = videoInput.videoHeight;
    
                // var src = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC4);
                var src;
                if (!streaming) {
                    // clean and stop.
                    if (self.settings.MRZ) {
                        self.MRZ.terminate();
                    }
                    // roi_border.style.stroke = "#6cbd45"
                    self.hide_task()
                    await self.checkmark();
                
                    canvasCamera.style.display = 'block'
                    self.stop();


                    if (self.settings.APPROVAL) {
                        await approval()
                    } else {
                        if ('onComplete' in self.settings) {
                            self.settings.onComplete(self.output)
                        }
                    }

                    // TEST
                    if ('DEBUG' in self.settings && self.settings.DEBUG == true) {
                        let sum = fps_total.reduce((a, b) => a + b, 0);
                        let fps_avg = (sum / fps_total.length) || 0;
                        self.output['image'] = self.output['image'].slice(0, 40)+'...'
                        self.output['fps_avg'] = fps_avg;
                        self.output['fps_total'] = fps_total;  
                        
                        document.body.innerHTML = "<pre id=test_result style='overflow-wrap: break-word;'></pre>";
                        let test_result = document.getElementById('test_result');
                        test_result.textContent = JSON.stringify({...self.settings,...self.output}, null, 2)
                        console.log({...self.settings, ...self.output})
                    }
                    

                    return;
                }
                // start processing.


                // cap.read(src);

                src = await read_from_canvas(src);

                await pipeline(src)
      
                // schedule the next one.
                let runtime = (performance.now() - begin)
                
                let delay = 1000/FPS - runtime;
                delay = delay>0?delay:0

                // console.log(delay)


                // console.log('inner_fps', 1000/inner_time)
                // console.log(runtime, inner_time)

                if (self.settings.DEBUG && self.settings.DEBUG == true) {
                    frame_init++;
                    if (frame_init > 0) {
                        let fps_v = 1000/(runtime+delay);fps_total.push(fps_v);
                    } 
                }
                // self.alert("FPS "+ 1000/(runtime+delay))
                setTimeout(requestAnimationFrame(processVideo), delay);
            } catch (err) {
                if (self.settings.DEBUG) {
                    console.log(err)
                    console.log(JSON.stringify(err))
                }
                self.settings.onError(err);
            } finally {
                if (typeof src !== 'undefined') {
                    src.delete();
                }
            }
        };
        setTimeout(requestAnimationFrame(processVideo), 0);
    };
    
    this.onVideoStopped = function() {
        streaming = false;
        capture_btn_container.style.display = 'none'
        cv_utils.stopCamera();
        self.hide_loader();
        self.clear_roi();
    };

    this.load_script = async function (src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    this.load_modules = async function() {
        async function start_video() {
            await new Promise(function(resolve, reject) {
                try {
                    videoInput.addEventListener("loadeddata", ()=>resolve(true), false);
                    videoInput.loop = true
                    videoInput.muted = true
                    videoInput.src = self.settings['VIDEO_URL']
                    videoInput.crossOrigin = "Anonymous";
                } catch {
                    reject(false)
                }
            })
        }    
        async function start_camera() {
            let camera_is_started = await cv_utils.startCamera('hd_vga', null, 'videoInput');
            if (!camera_is_started) {
                throw 'capture_error'
            }
        }
        function load_logo() {
            footer.innerHTML = `<img src="${self.settings.ROOT}images/logo.png" onError="footer.innerHTML=\'\'"></img>`
        }
        function load_explain() {
            explain_img.src = `${self.settings.ROOT}images/id_front-back.gif`
            explain_button.onclick = self.hide_explain
            explain_button.innerText = NOTI['continue']
            explain_text.innerText = NOTI['flip']
            // flip_div.innerHTML += `<img src="${self.settings.ROOT}images/id_flip.gif" onError="footer.innerHTML=\'\'"></img>`
        }
        function loading_stop() {
            loading.style.display = 'none'
        }
        async function load_notifications(language) {
            await self.load_script(`${self.settings.ROOT}js/language/${language}.js`)
        }
        async function set_notifications(LANGUAGE) {
            NOTI = {
                "start_prompt": "Tap to start",
                "flip": "Flip the document",
                "flip_frontside": "Flip the document to the frontside",
                "flip_backside": "Flip the document to the backside",
                "std_msg_0": "Place your document in the frame",
                "exp_dark": "Environment is too dark",
                "blur": "Hold still...",
                "glare": "Glare detected",
                "size": "Move closer",
                "focus": "Focus on document.",
                "approval_prompt": "Is the image right?",
                "retry": "Try again",
                "confirm": "Accept",
                "capture_error": "We were unable to capture an image. Camera access is required.",
                "mrz_search": "Searching MRZ...",
                "continue": "Continue"
            }
            if ((typeof(LANGUAGE)!==undefined)) {
                NOTI = {...NOTI, ...LANGUAGE}
            }
        }
        function set_variables() {
            check_count = 0;
            alert_id = 0; 
            FPS = 20; 
            std_msg = NOTI['std_msg_0']; 
            started = false; 
            is_drawed = false;
            self.output = {'images': [], 'meta': []};
            self.start_prompt = 'start_prompt'
            retry_count = 0;
            slidingwindow_complete = []
            self.running = true
            self.timeouts = []
            self.mrz_read = false
            self.has_flipped = false
            self.reset_force();
            self.viewport = []
        }
        async function load_ocr() {
            self.MRZ = new MRZ(self.settings)
            await self.MRZ.init()
            if (self.settings.MRZ_SETTINGS.OCR) {
                let image = self.settings.MODELS_PATH+'ocr/verblijf.jpg'
                // const text = await self.MRZ.mrz_scanner(image);
                // console.log(text)
            }
        }

        try {
            let progress_bar = new Progress_Bar(pbar)
            self.settings.progress_bar = progress_bar
            progress_bar.init_pbar(7)


            if (typeof LANGUAGE == 'undefined') {await load_notifications(self.settings.LANGUAGE);}
            set_notifications(LANGUAGE)
            start_btn.innerText = NOTI.start_prompt
            load_logo();
            load_explain();
            set_variables();
            progress_bar.increase_pbar()

            await Promise.all([ (async ()=> {
                DocModel = new DocSegmentation(self.settings)
                await DocModel.load_model_onnx()
                progress_bar.increase_pbar()

                // GM = new GlareSegmentation(self.settings)
                // await GM.load_model_onnx()
                GM = undefined
                progress_bar.increase_pbar()

                GC = new GlareClassify(self.settings)
                await GC.load_model_onnx()
                progress_bar.increase_pbar()
                
                QC = new QualityControl(self.settings, GM, GC)
                await QC.init()
                progress_bar.increase_pbar()
            })(),
            (async ()=> {
                if (self.settings.MRZ) {
                    await load_ocr();
                }
                progress_bar.increase_pbar()
            })(),     
            (async ()=> {
                await cv_utils.loadOpenCvV2();
                progress_bar.increase_pbar()
            })()])

            if ('VIDEO_URL' in self.settings) {
                await start_video();
            } else {
                await start_camera();
            }
            
            loading_stop()
            progress_bar.hide_pbar();

            self.onVideoStarted();
            start_btn_container.style.display = "flex"
        } catch (err) {
            if (self.settings.DEBUG) {
                console.log(err)
                console.log(JSON.stringify(err))
            }
            // cv_utils.printError('Failed to initialize');
            loading_stop()
            self.settings.onError(err)
        };
    };

    this.create_container = function(containerID) {
        function create_divs(containerID) {
            mount_container = document.getElementById(containerID)
            mount_container.innerHTML = `<div id="videoContainer"> <video autoplay webkit-playsinline playsinline id="videoInput"></video>
            <div class="loading" id="loading_container">
                <div class="loading">
                    <div class="lds-default">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div id="checkmark" class="checkmark draw"></div>
                </div>
                <div id="pbar_container">
                    <div id="pbar">
                        <div id="pbar_val"> </div>
                    </div>
                </div>
            </div>
            <div class="fullscreen">
                <div id="infoImgs">
                    <canvas id="canvasCamera"></canvas>
                    <canvas id="canvasCameraMRZ" style="display:None"></canvas>
                    <canvas id="canvasOutput"></canvas>
                </div>
                <div class="fullscreen center column"><canvas id="canvasOverlay"></canvas> </div>
                <div id="roi" class="fullscreen">
                    <div> <svg id="roi_border_svg">
                            <defs>
                                <mask id="mask1">
                                    <rect id="roi_bg" x="0" y="0" width="100%" height="100%" fill="rgb(150,150,150)" />
                                    <rect id="roi_mask" x="50%" y="50%" width="50px" height="50px" rx="5" fill="black" />
                                </mask>
                            </defs>
                            <rect id="roi_rect" width="100%" height="100%" mask="url(#mask1)" />
                            <rect id="roi_border" rx="15" opacity="0.5"/>
                        </svg> </div>
                </div>
                <div id="alertContainer" class="fullscreen center">
                    <div id="alertBox"> <span></span> </div>
                </div>
                <div id="taskContainer" class="fullscreen"><div id="taskBox"></div></div>
                <div id="capture-button-container">
                    <div id="capture-button-center"><button id="capture-button" class="capture-button"></button></div>
                </div>
                <div id="footer_container">
                    <div id="footer"> </div>
                </div>
                <div id="start-button-container" class="fullscreen center"><div id="start-button"></div> </div>
                <div id="explain-container" class="fullscreen center">
                    <div id="explain-div" class="center column">
                        <p id="explain-text">Flip your document</p>
                        <img id="explain-img">
                        <button id="explain-button">Continue</button>
                    </div>
                </div>
                <div id="exit" class="exit"></div>
            </div>
        </div>
        `
        }
        function style_container(containerID) {
            let container = document.getElementById(containerID)
            container.style.position = 'fixed';
            container.style.top = '0px';
            container.style.left = '0px';
            container.style.height = '100%';
            container.style.width = '100%';
            container.style.zindex= '1000';
        }
        function set_elements() {
            cv_utils = new Utils('alertBox', `${self.settings.ROOT}js/src/utils/opencv.js`);
            // Camera
            videoInput = document.getElementById('videoInput');
            // main container
            main_container = document.getElementById('videoContainer');
            // debug
            infoImgs = document.getElementById('infoImgs');
            infoImgs.innerHTML+="<img id='cardImg'><img id='cardImg2'>"
            document.getElementById('cardImg').style.display = "none"
            document.getElementById('cardImg2').style.display = "none"
            // detection overlay
            canvasOutput = document.getElementById('canvasOutput');
            //  capture output
            canvasCamera = document.getElementById('canvasCamera');
            // canvas Overlay
            canvasOverlay = document.getElementById('canvasOverlay');
            // shutter
            chm = document.getElementById('checkmark');
            // close
            exit = document.getElementById('exit');
            exit.onclick = self.exit
            // capture
            capture_btn_container = document.getElementById('capture-button-container');
            capture_btn = document.getElementById('capture-button');
            capture_btn.onclick = self.capture
            // start
            start_btn_container = document.getElementById('start-button-container');
            start_btn = document.getElementById('start-button');
            start_btn_container.onclick = self.start
            // explain
            explain_container = document.getElementById('explain-container');
            explain_img = document.getElementById('explain-img')
            explain_button = document.getElementById('explain-button')
            explain_text = document.getElementById('explain-text')
            // alert
            alertBox = document.getElementById('alertBox');
            taskBox = document.getElementById('taskBox');
            // roi
            roi_div = document.getElementById('roi');
            roi_border = document.getElementById('roi_border');
            roi_mask = document.getElementById('roi_mask');
            roi_bg = document.getElementById('roi_bg');
            // loading
            loading = document.getElementById('loading_container');
            // footer
            footer = document.getElementById('footer')
            // progress bar
            pbar_container = document.getElementById('pbar_container')
            pbar = document.getElementById('pbar_val')
        }

        if (!(('CREATE_DIVS' in self.settings) & (self.settings.CREATE_DIVS == false))) {
            create_divs(containerID);
        }
        style_container(containerID);
        set_elements();
    };

    this.init  = async function(settings) {
        try {
            this.settings = {
                CROP_CARD: false,
                GLARE_THRESHOLD:0.001,
                BLUR_THRESHOLD:0.5,
                MOVEMENT_THRESHOLD:0.3, 
                FOCUS_THRESHOLD:0.4, 
                EXPOSURE_THRESHOLD:0.17, 
                CHECK_TOTAL:10, 
                GLARE_LIVE_CHECK:true,
                LANGUAGE: "nl",
                MODELS_PATH: 'models/',
                DETECT_PAPER:false,
                DEBUG: false,
                APPROVAL: false,
                MRZ: false,
                MRZ_SETTINGS: {
                    MRZ_RETRIES: 5,
                    FLIP: false,
                    FLIP_EXCEPTION: [],
                    MIN_VALID_SCORE: 50,
                    OCR: true,
                },
                SLIDINGWINDOW_LENGTH: 5,
                SLIDINGWINDOW_THRESH: 0.5,
                ROOT: "",
                CAPTURE_BTN_AFTER: 5000,
                BACKEND: 'wasm',
                onUserExit: function(err){console.log(err)},
                onError: function(err){console.log(err)}
            }
            for (const [key, value] of Object.entries(settings)) {
                if (typeof value === 'object') {
                    settings[key] = {...this.settings[key], ...value}
                }
              }
            this.settings = {...this.settings, ...settings}
            self.settings.MODELS_PATH = self.settings.ROOT+self.settings.MODELS_PATH
            if (self.settings.DETECT_PAPER) {
                self.settings.GLARE_LIVE_CHECK = false
                self.settings.MRZ = false
            }
            if (!('CONTAINER_ID' in settings) & !('GLARE_MODEL_URL' in settings)) {
                return
            }
            clearInterval(overlayToggleID);
            self.create_container(this.settings.CONTAINER_ID)
            self.load_modules()
        } catch (error) {
            if (self.settings.DEBUG) {
                console.log(err)
                console.log(JSON.stringify(err))
            }
            self.settings.onError(error)
        }
        return
    };
}

function Utils(errorOutputId, OPENCV_URL) { // eslint-disable-line no-unused-vars
    let self = this;
    this.errorOutput = document.getElementById(errorOutputId);

    this.loadOpenCv = function(onloadCallback) {
        if (typeof cv == 'undefined') {
            let script = document.createElement('script');
            script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');
            script.addEventListener('load', async () => {
                if (cv.getBuildInformation)
                {
                    // console.log(cv.getBuildInformation());
                    onloadCallback();
                }
                else
                {
                    // WASM
                    if (cv instanceof Promise) {
                        cv = await cv;
                        // console.log(cv.getBuildInformation());
                        onloadCallback();
                    } else {
                        cv['onRuntimeInitialized']=()=>{
                            // console.log(cv.getBuildInformation());
                            onloadCallback();
                        }
                    }
                }
            });
            script.addEventListener('error', () => {
                self.printError('Failed to load ' + OPENCV_URL);
            });
            script.src = OPENCV_URL;
            let node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(script, node);
        } else {
            onloadCallback();
        }
    };

    this.loadOpenCvV2 = async function() {
        return new Promise(function (resolve, reject) {
            if (typeof cv == 'undefined') {
                var s;
                s = document.createElement('script');
                s.src = OPENCV_URL;
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            }
            else {
                resolve()
            }
        });
    }

    this.createFileFromUrl = function(path, url, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function(ev) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let data = new Uint8Array(request.response);
                    cv.FS_createDataFile('/', path, data, true, false, false);
                    callback();
                } else {
                    self.printError('Failed to load ' + url + ' status: ' + request.status);
                }
            }
        };
        request.send();
    };

    this.loadImageToCanvas = function(url, cavansId) {
        let canvas = document.getElementById(cavansId);
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = url;
    };

    this.executeCode = function(textAreaId) {
        try {
            this.clearError();
            let code = document.getElementById(textAreaId).value;
            eval(code);
        } catch (err) {
            this.printError(err);
        }
    };

    this.clearError = function() {
        this.errorOutput.innerHTML = '';
    };

    this.printError = function(err) {
        if (typeof err === 'undefined') {
            err = '';
        } else if (typeof err === 'number') {
            if (!isNaN(err)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
                }
            }
        } else if (typeof err === 'string') {
            let ptr = Number(err.split(' ')[0]);
            if (!isNaN(ptr)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
                }
            }
        } else if (err instanceof Error) {
            err = err.stack.replace(/\n/g, '<br>');
        }
        this.errorOutput.innerHTML = err;
        this.errorOutput.style.display = 'block';
    };

    this.loadCode = function(scriptId, textAreaId) {
        let scriptNode = document.getElementById(scriptId);
        let textArea = document.getElementById(textAreaId);
        if (scriptNode.type !== 'text/code-snippet') {
            throw Error('Unknown code snippet type');
        }
        textArea.value = scriptNode.text.replace(/^\n/, '');
    };

    this.addFileInputHandler = function(fileInputId, canvasId) {
        let inputElement = document.getElementById(fileInputId);
        inputElement.addEventListener('change', (e) => {
            let files = e.target.files;
            if (files.length > 0) {
                let imgUrl = URL.createObjectURL(files[0]);
                self.loadImageToCanvas(imgUrl, canvasId);
            }
        }, false);
    };

    function onVideoCanPlay() {
        if (self.onCameraStartedCallback) {
            self.onCameraStartedCallback(self.stream, self.video);
        }
    };

    this.startCamera = async function(resolution, callback, videoId) {
        async function getDevices() {
            // if (!navigator.userAgent.toLowerCase().includes('android')) {
            //     await window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
            // }
            await window.navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
                function(stream) {
                    stream.getTracks().forEach(track => track.stop())
                }
            )
            const devices = await window.navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            return videoDevices
          }
        
        try {
            const constraints = {
                'qvga': {facingMode: 'environment', width: {exact: 320}, height: {exact: 240}},
                'vga': {facingMode: 'environment', width: {exact: 640}, height: {exact: 480}},
                'hd_vga': {facingMode: 'environment', height: {min: 480, ideal: 720, max:1080}, width: {min: 640, ideal: 1280, max:1980}},
                'mobile': {facingMode: 'environment'}};
            let video = document.getElementById(videoId);
            if (!video) {
                video = document.createElement('video');
            }

            let videoConstraint = constraints[resolution];
            if (!videoConstraint) {
                videoConstraint = true;
            }

            // BACK CAMERA

            let devices = await getDevices()
            let dev_id = devices[0].deviceId
            let back_cams = []
            for (let i=0; i<devices.length; i++) {
                let dv = devices[i]
                if ((dv.label.toLocaleLowerCase().includes('back') || dv.label.toLocaleLowerCase().includes('achter'))) {
                    back_cams.push({'label': dv.label.toLocaleLowerCase(), 'idx':i, 'deviceId': dv.deviceId})
                }
            }
            if (navigator.userAgent.toLowerCase().includes('android')) {
                back_cams.sort((a, b) => {
                    const labelA = a.label.toLowerCase();
                    const labelB = b.label.toLowerCase();
                
                    if (labelA < labelB) {
                    return -1; // `a` should come before `b`
                    }
                    if (labelA > labelB) {
                    return 1; // `a` should come after `b`
                    }
                    return 0; // `a` and `b` are equal
                });
            }

            if (back_cams.length) {
                dev_id = back_cams[0].deviceId
            }

            videoConstraint = {
                ...videoConstraint,
                deviceId: {
                    exact: dev_id
                }
            }

            return new Promise(function(resolve, reject) {
                window.navigator.mediaDevices.getUserMedia({video: videoConstraint, audio: false})
                    .then(function(stream) {
                        video.srcObject = stream;
                        video.play();
                        self.video = video;
                        self.stream = stream;
                        self.onCameraStartedCallback = callback;
                        video.addEventListener('canplay', onVideoCanPlay, false);
                        self.onCameraStartedCallback = ()=>{resolve(true)};
                    })
                    .catch(function(err) {
                        reject('capture_error')
                        self.printError('Camera Error: ' + err.name + ' ' + err.message);
                    });
                })
        } catch (err) {
            return false
        }
    };

    this.stopCamera = function() {
        if (this.video) {
            this.video.pause();
            this.video.srcObject = null;
            this.video.removeEventListener('canplay', onVideoCanPlay);
        }
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
    };
};
