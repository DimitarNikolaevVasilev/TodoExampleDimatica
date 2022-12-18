import * as path from "path";
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeTypeDefs} from '@graphql-tools/merge';

const schemes = loadFilesSync(path.join(__dirname, '../components/**/*Schema.js'), { recursive: true });


export default mergeTypeDefs([schemes.map(a => a.graphql)]);